import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-card-title",
  imports: [],
  template: `
    <div
      class="flex justify-between bg-slate-700 text-white p-4 cursor-pointer"
    >
      <h1>
        <ng-content></ng-content>
      </h1>
      <ng-content select="app-card-icon"></ng-content>
    </div>
  `,
  styles: ``,
})
export class CardTitle {}
