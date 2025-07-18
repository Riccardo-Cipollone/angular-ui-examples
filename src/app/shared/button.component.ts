import { NgClass } from "@angular/common";
import { Component, computed, input } from "@angular/core";

export type Variant = "primary" | "warning" | "accent";

@Component({
  selector: "app-button",
  imports: [NgClass],
  template: `
    <a
      class="btn"
      [href]="url()"
      [target]="targetValue()"
      [ngClass]="{
        'btn-primary': variant() === 'primary',
        'btn-warning': variant() === 'warning',
        'btn-accent': variant() === 'accent',
      }"
    >
      <ng-content></ng-content>
    </a>
  `,
  styles: ``,
})
export class Button {
  variant = input<"primary" | "warning" | "accent">("primary");
  url = input<string>();

  targetValue = computed(() => {
    return this.url()?.includes("http") ? "_blank" : "_self";
  });
}
