import { Component, inject, linkedSignal, OnInit, signal } from "@angular/core";
import { UserService } from "./services/users";
import { ArrayButton } from "./shared/button-array";
import { Weather } from "./shared/weather";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, distinctUntilChanged, map } from "rxjs";
import { City, Country } from "./models/country";
import { initialState } from "./models/data";
import { Tabbar } from "./shared/tabbar/tabbar";

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

      <!-- <app-fx [gap]="10" justify="start">
        <app-fx-item class="bg-red-300" grow>left</app-fx-item>
        <app-fx-item grow>middle</app-fx-item>
        <app-fx-item>right</app-fx-item>
      </app-fx> -->

      <!-- <app-button-group [gap]="2" borders>
        <app-button (click)="doSomething()" variant="primary"
          >primary</app-button
        >
        <app-button variant="warning" url="/about">warning</app-button>
        <app-button url="https://www.learnbydo.ing" variant="accent"
          >accent</app-button
        >
      </app-button-group> -->

      <!-- <app-button-array
        wrap
        borders
        align="center"
        [data]="buttons"
      ></app-button-array> -->

      <!-- <div class="flex justify-end">
        <button class="btn" (click)="isOpen.set(true)">Open side panel</button>
      </div>
      <app-side-panel [(isOpen)]="isOpen" [title]="'placeholder'">
        Lorem ipsum dolor sit amet.
      </app-side-panel> -->
      <!-- <app-card title="My profile" [(isOpen)]="isCardOpen">
        <app-card-title>
          My new Profile
          <app-card-icon (iconClick)="doSomething()">😎</app-card-icon>
        </app-card-title>
        <app-card-body>Lorem ipsum dolor sit amet.</app-card-body>
        <app-card-footer>Actions</app-card-footer>
      </app-card> -->

      <!-- Weather component -->
      <!-- <div class="flex flex-col gap-3">
        <input
          type="text"
          [formControl]="input"
          placeholder="Search city"
          class="input input-primary"
        />
        <app-weather [city]="value()"></app-weather>
      </div> -->

      <app-tabbar
        [items]="countries()"
        [(selectedItem)]="activeCountry"
      ></app-tabbar>
      @if (activeCountry(); as country) {
        <app-tabbar
          [items]="country.cities"
          labelField="name"
          [(selectedItem)]="activeCity"
        />
      }
      @if (activeCountry()) {
        <p class="border border-slate-300 p-3">
          {{ activeCity()?.desc }}
        </p>
      }
    </div>
  `,

  imports: [ReactiveFormsModule, Tabbar],
})
export class App implements OnInit {
  userSrv = inject(UserService);

  isOpen = signal(false);
  isCardOpen = signal(false);

  input = new FormControl<string>("", { nonNullable: true });
  value = toSignal(
    this.input.valueChanges.pipe(
      map((text) => text.toLowerCase()),
      debounceTime(1000),
      distinctUntilChanged(),
    ),
    { initialValue: "" },
  );

  countries = signal<Country[]>(initialState);
  activeCountry = signal<Country | null>(this.countries()[0]);
  activeCity = linkedSignal<City | null>(() => {
    return this.activeCountry()?.cities[0] ?? null;
  });

  constructor() {}

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

  doSomething() {
    console.log("somethign");
  }

  buttons: ArrayButton[] = [
    {
      label: "About (internal)",
      variant: "primary",
      url: "/about",
    },
    {
      label: "Another (internal)",
      variant: "primary",
      url: "/about",
    },
    {
      label: "LearnByDoing (external)",
      variant: "accent",
      url: "https://www.learnbydo.ing",
    },
  ];
}

interface Location {
  lat: number;
  lng: number;
  zoom: number;
  mapType: "light" | "terrain";
}
