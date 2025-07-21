import { Component } from "@angular/core";

@Component({
  selector: "app-card-footer",
  imports: [],
  template: `
    <div class="border-t border-slate-500 bg-slate-100 text-black px-3 py-1">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class CardFooter {}
