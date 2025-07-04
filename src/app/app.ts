import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ErrorMsg } from "./components/error-msg";
import { UserForm } from "./components/user-form";
import { UserList } from "./components/user-list";
import { User } from "./models/user";

@Component({
  selector: "app-root",
  template: `
    <div class="max-w-screen-sm mx-6 sm:mx-auto">
      <app-error-msg [text]="error()"></app-error-msg>

      <app-user-form
        [activeUser]="activeUser()"
        (saveUser)="saveUser($event)"
        (resetActiveUser)="resetActiveUser()"
      ></app-user-form>
      <app-user-list
        [users]="users()"
        [activeUser]="activeUser()"
        (selectUser)="selectUser($event)"
        (deleteUser)="deleteUser($event)"
      ></app-user-list>
    </div>
  `,

  imports: [ReactiveFormsModule, ErrorMsg, UserList, UserForm],
})
export class App implements OnInit {
  http = inject(HttpClient);
  users = signal<Partial<User>[]>([]);
  activeUser = signal<Partial<User> | null>(null);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.error.set(null);
    this.http
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .subscribe({
        next: (res) => {
          this.users.set(res);
        },
        error: (err) => {
          this.error.set(`Server error: ${err.status}`);
        },
      });
  }

  deleteUser(userToDelete: Partial<User>) {
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

  saveUser(formData: Partial<User>) {
    if (this.activeUser()?.id) {
      this.editUser(formData);
    } else {
      this.addUser(formData);
    }
  }

  addUser(formData: Partial<User>) {
    this.error.set(null);
    this.http
      .post<
        Partial<User>
      >(`https://jsonplaceholder.typicode.com/users/`, formData)
      .subscribe({
        next: (newUser) => {
          this.users.update((users) => {
            return [...users, newUser];
          });
        },
        error: (err) => {
          this.error.set(`Server error: ${err.status}`);
        },
      });
  }

  editUser(formData: Partial<User>) {
    this.error.set(null);
    this.http
      .patch<User>(
        `https://jsonplaceholder.typicode.com/users/${this.activeUser()?.id}`,
        formData,
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
    this.activeUser.set(user);
  }

  resetActiveUser() {
    this.activeUser.set(null);
  }
}
