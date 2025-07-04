import { NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { User } from "../models/user";

@Component({
  selector: "app-user-list",
  imports: [NgClass],
  template: `
    <ul>
      @for (user of users(); track user.id) {
        <li
          class="flex justify-between items-center py-2 border-b"
          [ngClass]="{
            'bg-pink-200 text-black': user.id === activeUser()?.id,
          }"
          (click)="selectUser.emit(user)"
        >
          {{ user.name }} ( {{ user.email }} )
          <button
            class="btn btn-secondary btn-sm"
            (click)="deleteHandler(user, $event)"
          >
            delete
          </button>
        </li>
      } @empty {
        <div>There are no users</div>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  users = input<Partial<User>[]>([]);
  activeUser = input<Partial<User | null>>(null);

  selectUser = output<Partial<User>>();
  deleteUser = output<Partial<User>>();

  deleteHandler(user: Partial<User>, event: MouseEvent) {
    event.stopPropagation();
    this.deleteUser.emit(user);
  }
}
