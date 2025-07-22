import { HttpClient } from "@angular/common/http";
import {
  Component,
  computed,
  effect,
  inject,
  input,
  resource,
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
    @if (meteoResource.value()) {
      <pre>{{ meteoResource.value()?.main?.temp | json }}</pre>
      <img [src]="meteoIcon()" alt="" />
    }
    <pre>Value: {{ meteoResource.value() | json }}</pre>
    <pre>Is Loading: {{ meteoResource.isLoading() | json }}</pre>
    <pre>Error: {{ $any(meteoResource.error())?.cause }}</pre>
  `,
  styles: ``,
})
export class Weather {
  http = inject(HttpClient);
  city = input<string>();

  // meteo = signal<MeteoInterface | null>(null);
  meteoResource = resource<any, any>({
    params: () => ({ city: this.city() }),
    loader: async ({ params }) => {
      console.log("PARAMS: ", params);
      if (params.city) {
        const res = await fetch(`${BASE_URL}${ENDPOINT}&q=${params.city}`);
        if (!res.ok) {
          throw new Error("Problems while getting meteo for the city");
        }
        const data = await res.json();
        return data;
      }
    },
  });

  meteoIcon = computed(() => {
    const icon = this.meteoResource.value()?.weather[0]?.icon;
    return icon ? `https://api.openweathermap.org/img/w/${icon}.png` : null;
  });

  constructor() {
    effect(() => {
      console.log(this.meteoResource.error()?.message);
    });
  }

  // constructor() {
  //   effect(() => {
  //     console.log(this.city());
  //     this.http
  //       .get<MeteoInterface>(`${BASE_URL}${ENDPOINT}&q=${this.city()}`)
  //       .subscribe((meteo) => {
  //         console.log("Response: ", meteo);
  //         this.meteo.set(meteo);
  //       });
  //   });
  // }
}
