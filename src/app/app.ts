import { Component, inject, OnInit } from "@angular/core";
import { ErrorMsg } from "./components/error-msg";
import { UserForm } from "./components/user-form";
import { UserList } from "./components/user-list";
import { UserService } from "./services/users";
import { Picsum } from "./shared/picsum";
import { StaticMap } from "./shared/static-map";
import { JsonPipe } from "@angular/common";
import { Title } from "./shared/title";
import { Fx } from "./shared/fx";
import { FxItem } from "./shared/fx-item";

@Component({
  selector: "app-root",
  template: `
    <div class="max-w-screen-sm mx-6 sm:mx-auto">
      <!-- <app-error-msg [text]="userSrv.error()"></app-error-msg>

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

      <app-picsum border></app-picsum>
      <app-picsum height="300" width="400" grayscale></app-picsum> -->

      <!-- <div class="flex gap-2 my-2">
        <button class="btn btn-info" (click)="changeTerrainType('terrain')">
          Terrain
        </button>
        <button class="btn btn-info" (click)="changeTerrainType('light')">
          Light
        </button>
        <button class="btn btn-info" (click)="increment()">+</button>
        <button class="btn btn-info" (click)="decrement()">-</button>
      </div>
      <app-static-map
        [lat]="location.lat"
        [lng]="location.lng"
        [zoom]="location.zoom"
        [mapType]="location.mapType"
        h="400"
        w="400"
      ></app-static-map> -->

      <!-- <app-title size="sm">Title SM</app-title>
      <app-title size="md" underlined>Title MD</app-title>
      <app-title size="xl">Title XL</app-title>

      <app-fx [gap]="16">
        <div>Lorem ipsum dolor sit.</div>
        <div>Lorem ipsum dolor sit amet.</div>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa,
          temporibus.
        </div>
      </app-fx> -->

      <app-fx [gap]="10" justify="start">
        <app-fx-item class="bg-red-300" grow>left</app-fx-item>
        <app-fx-item grow>middle</app-fx-item>
        <app-fx-item>right</app-fx-item>
      </app-fx>
    </div>
  `,

  imports: [ErrorMsg, UserList, UserForm, Picsum, StaticMap, Title, Fx, FxItem],
})
export class App implements OnInit {
  userSrv = inject(UserService);

  ngOnInit() {
    this.userSrv.loadUsers();
  }

  location: Location = {
    lat: 43,
    lng: 22,
    zoom: 8,
    mapType: "light",
  };

  changeTerrainType(type: "light" | "terrain") {
    this.location.mapType = type;
  }

  increment() {
    this.location.zoom = this.location.zoom + 1;
  }
  decrement() {
    this.location.zoom = this.location.zoom - 1;
  }
}

interface Location {
  lat: number;
  lng: number;
  zoom: number;
  mapType: "light" | "terrain";
}
