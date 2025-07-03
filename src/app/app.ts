import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  template: `
    <div class="max-w-screen-sm mx-6 sm:mx-auto">
      @if (error()) {
      <div class="alert alert-error my-3">
        {{ error() }}
      </div>
      }

      <form class="my-3" [formGroup]="form" (submit)="saveUser()">
        <div class="flex gap-2 my-3">
          <input
            type="text"
            formControlName="name"
            placeholder="name"
            class="input input-bordered max-w-48"
          />
          <input
            type="text"
            formControlName="email"
            placeholder="email"
            class="input input-bordered max-w-48"
          />
        </div>

        <div class="join">
          <button class="join-item btn btn-success" [disabled]="form.invalid">
            {{ activeUser()?.id ? 'EDIT' : 'ADD' }}
          </button>

          @if (activeUser()?.id) {
          <button
            type="button"
            class="join-item btn"
            (click)="resetActiveUser()"
          >
            ADD NEW USER
          </button>
          }
        </div>
      </form>

      <ul>
        @for (user of users(); track user.id) {
        <li
          class="flex justify-between items-center py-2 border-b"
          [ngClass]="{
            'bg-pink-200 text-black': user.id === activeUser()?.id
          }"
          (click)="selectUser(user)"
        >
          {{ user.name }} ( {{ user.email }} )
          <button
            class="btn btn-secondary btn-sm"
            (click)="deleteUser(user, $event)"
          >
            delete
          </button>
        </li>
        } @empty {
        <div>There are no users</div>
        }
      </ul>
    </div>
  `,

  imports: [ReactiveFormsModule, NgClass],
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  users = signal<Partial<User>[]>([]);
  activeUser = signal<Partial<User> | null>(null);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.minLength(2)]],
  });

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.error.set(null);
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (res) => {
          this.users.set(res);
        },
        error: (err) => {
          this.error.set(`Server error: ${err.status}`);
        },
      });
  }

  deleteUser(userToDelete: Partial<User>, event: MouseEvent) {
    event.stopPropagation();
    this.error.set(null);

    if (userToDelete.id === this.activeUser()?.id) {
      this.resetActiveUser();
    }

    this.http
      .delete(`https://jsonplaceholder.typicode.com/users/${userToDelete.id}`)
      .subscribe({
        next: (res) => {
          this.users.update((users) => {
            return users.filter((user) => user.id !== userToDelete.id);
          });
        },
        error: (err) => {
          this.error.set(`Server error: ${err.status}`);
        },
      });
  }

  saveUser() {
    if (this.activeUser()?.id) {
      this.editUser();
    } else {
      this.addUser();
    }
  }

  addUser() {
    this.error.set(null);
    this.http
      .post<Partial<User>>(
        `https://jsonplaceholder.typicode.com/users/`,
        this.form.value
      )
      .subscribe({
        next: (newUser) => {
          this.users.update((users) => {
            return [...users, newUser];
          });
          this.form.reset();
        },
        error: (err) => {
          this.error.set(`Server error: ${err.status}`);
        },
      });
  }

  editUser() {
    this.error.set(null);
    this.http
      .patch<User>(
        `https://jsonplaceholder.typicode.com/users/${this.activeUser()?.id}`,
        this.form.value
      )
      .subscribe({
        next: (updatedUser) => {
          this.users.update((users) => {
            return users.map((user) => {
              if (user.id === this.activeUser()?.id) {
                return updatedUser;
              }
              return user;
            });
          });
          this.resetActiveUser();
        },
        error: (err) => {
          this.error.set(`Server error: ${err.status}`);
        },
      });
  }

  selectUser(user: Partial<User>) {
    this.form.patchValue(user);
    this.activeUser.set(user);
  }

  resetActiveUser() {
    this.form.reset();
    this.activeUser.set(null);
  }
}
