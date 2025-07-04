import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "../models/user";

@Component({
  selector: "app-user-form",
  imports: [ReactiveFormsModule],
  template: `
    <form class="my-3" [formGroup]="form" (submit)="saveUserHandler()">
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
          {{ activeUser()?.id ? "EDIT" : "ADD" }}
        </button>

        @if (activeUser()?.id) {
          <button
            type="button"
            class="join-item btn"
            (click)="resetActiveUser.emit()"
          >
            ADD NEW USER
          </button>
        }
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm {
  fb = inject(FormBuilder);

  activeUser = input<Partial<User | null>>(null);
  resetActiveUser = output();
  saveUser = output<Partial<User>>();

  form = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.minLength(2)]],
  });

  constructor() {
    effect(() => {
      // Necessario per un bug di typescript che non riesce a riconoscere il type del signal
      const activeUser = this.activeUser();
      if (activeUser?.id) {
        this.form.patchValue(activeUser);
      } else {
        this.form.reset();
      }
    });
  }

  saveUserHandler() {
    this.saveUser.emit(this.form.value);
  }
}
