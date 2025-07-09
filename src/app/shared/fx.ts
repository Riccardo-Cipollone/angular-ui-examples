import { Component, computed, input } from "@angular/core";

export type Justify = "start" | "center" | "between" | "end";

@Component({
  selector: "app-fx",
  imports: [],
  template: `
    <div [class]="['flex', flexClasses()]" [style.gap.px]="gap()">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class Fx {
  gap = input(0);
  justify = input<Justify>("start");

  flexClasses = computed(() => {
    switch (this.justify()) {
      case "start":
        return "justify-start";
      case "center":
        return "justify-center";
      case "between":
        return "justify-between";
      case "end":
        return "justify-end";
    }
  });
}
