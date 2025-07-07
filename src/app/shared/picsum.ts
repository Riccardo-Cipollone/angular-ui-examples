import { NgClass } from "@angular/common";
import {
  booleanAttribute,
  Component,
  computed,
  input,
  numberAttribute,
} from "@angular/core";

@Component({
  selector: "app-picsum",
  imports: [NgClass],
  template: `
    <img
      [src]="url()"
      alt="Picsum image"
      [ngClass]="{
        'border-4 border-sky-400': border(),
      }"
    />
  `,
  styles: ``,
})
export class Picsum {
  width = input(300, { transform: numberAttribute });
  height = input(200, { transform: numberAttribute });
  border = input(false, { transform: booleanAttribute });
  grayscale = input(false, { transform: booleanAttribute });

  url = computed(() => {
    const w = this.width();
    const h = this.height();
    const grayscale = this.grayscale() ? "?grayscale" : "";
    return `https://picsum.photos/${w}/${h}${grayscale}`;
  });
}
