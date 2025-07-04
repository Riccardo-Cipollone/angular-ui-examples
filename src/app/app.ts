import { Component, inject, OnInit } from "@angular/core";
import { ErrorMsg } from "./components/error-msg";
import { UserForm } from "./components/user-form";
import { UserList } from "./components/user-list";
import { UserService } from "./services/users";

@Component({
  selector: "app-root",
  template: `
    <div class="max-w-screen-sm mx-6 sm:mx-auto">
      <app-error-msg [text]="userSrv.error()"></app-error-msg>

      <app-user-form
        [activeUser]="userSrv.activeUser()"
        (saveUser)="userSrv.saveUser($event)"
        (resetActiveUser)="userSrv.resetActiveUser()"
      ></app-user-form>
      <app-user-list
        [users]="userSrv.users()"
        [activeUser]="userSrv.activeUser()"
        (selectUser)="userSrv.selectUser($event)"
        (deleteUser)="userSrv.deleteUser($event)"
      ></app-user-list>
    </div>
  `,

  imports: [ErrorMsg, UserList, UserForm],
})
export class App implements OnInit {
  userSrv = inject(UserService);

  ngOnInit() {
    this.userSrv.loadUsers();
  }
}
