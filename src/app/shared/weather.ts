import { HttpClient } from "@angular/common/http";
import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";
import { MeteoInterface } from "../models/meteo";
import { JsonPipe } from "@angular/common";

const BASE_URL = "https://api.openweathermap.org";
const ENDPOINT =
  "/data/2.5/weather?units=metric&APPID=eb03b1f5e5afb5f4a4edb40c1ef2f534";

@Component({
  selector: "app-weather",
  imports: [JsonPipe],
  template: `
    @if (meteo()) {
      <pre>{{ meteo()?.main?.temp | json }}</pre>
      <img [src]="meteoIcon()" alt="" />
    }
  `,
  styles: ``,
})
export class Weather {
  http = inject(HttpClient);
  city = input<string>();

  meteo = signal<MeteoInterface | null>(null);
  meteoIcon = computed(() => {
    const icon = this.meteo()?.weather[0]?.icon;
    return icon ? `https://api.openweathermap.org/img/w/${icon}.png` : null;
  });

  constructor() {
    effect(() => {
      console.log(this.city());
      this.http
        .get<MeteoInterface>(`${BASE_URL}${ENDPOINT}&q=${this.city()}`)
        .subscribe((meteo) => {
          console.log("Response: ", meteo);
          this.meteo.set(meteo);
        });
    });
  }
}
