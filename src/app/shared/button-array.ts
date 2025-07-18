import { booleanAttribute, Component, input } from "@angular/core";
import { Button, Variant } from "./button.component";
import { ButtonGroup } from "./button-group";

export type ArrayButton = {
  label: string;
  variant: Variant;
  url: string;
};

@Component({
  selector: "app-button-array",
  imports: [ButtonGroup, Button],
  template: `
    <app-button-group
      [gap]="gap()"
      [borders]="borders()"
      [wrap]="wrap()"
      [align]="align()"
    >
      @for (button of data(); track $index) {
        <app-button [variant]="button.variant" [url]="button.url">
          {{ button.label }}
        </app-button>
      }
    </app-button-group>
  `,
  styles: ``,
})
export class ButtonArray {
  data = input.required<ArrayButton[]>();
  gap = input<1 | 2 | 4 | 8>(1);
  borders = input(false, { transform: booleanAttribute });
  wrap = input(false, { transform: booleanAttribute });
  align = input<"start" | "center" | "end">("start");
}
