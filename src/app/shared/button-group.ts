import { NgClass } from "@angular/common";
import { booleanAttribute, Component, input } from "@angular/core";

@Component({
  selector: "app-button-group",
  imports: [NgClass],
  template: `
    <div
      class="inline-flex flex-wrap gap-3 p-4 rounded-2xl"
      [ngClass]="{
        'gap-1': gap() === 1,
        'gap-2': gap() === 2,
        'gap-4': gap() === 4,
        'gap-8': gap() === 8,
        'border-2 border-slate-400': borders(),
        'flex-wrap': wrap(),
        'justify-start': align() === 'start',
        'justify-center': align() === 'center',
        'justify-end': align() === 'end',
      }"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class ButtonGroup {
  gap = input<1 | 2 | 4 | 8>(1);
  borders = input(false, { transform: booleanAttribute });
  wrap = input(false, { transform: booleanAttribute });
  align = input<"start" | "center" | "end">("start");
}
