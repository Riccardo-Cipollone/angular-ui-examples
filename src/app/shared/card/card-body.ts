import { Component } from "@angular/core";

@Component({
  selector: "app-card-body",
  imports: [],
  template: `
    <div
      class="border border-slate-700 p-4 bg-white text-black overflow-hidden"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class CardBody {}
