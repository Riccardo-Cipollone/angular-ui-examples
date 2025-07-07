import { HttpParams } from "@angular/common/http";
import { Component, computed, input, numberAttribute } from "@angular/core";

const BASE_URL = "https://maptoolkit.p.rapidapi.com/staticmap";
const API_KEY = "17e8c7ce2bmsh7421b690c7ffd11p1092bcjsn4f3f845c74ca";

@Component({
  selector: "app-static-map",
  template: `<img [src]="url()" alt="Map" /> `,
})
export class StaticMap {
  lat = input.required<number>();
  lng = input.required<number>();
  h = input(200, { transform: numberAttribute });
  w = input(200, { transform: numberAttribute });
  zoom = input(5, { transform: numberAttribute });
  mapType = input<"terrain" | "light">("terrain");

  url = computed(() => {
    const params = new HttpParams()
      .set("maptype", this.mapType())
      .set("size", `${this.w()}x${this.h()}`)
      .set("center", `${this.lat()},${this.lng()}`)
      .set("zoom", this.zoom())
      .set("rapidapi-key", API_KEY);
    console.log("NEW PARAMS: ", params);
    return `${BASE_URL}/?${params.toString()}`;
  });
}
