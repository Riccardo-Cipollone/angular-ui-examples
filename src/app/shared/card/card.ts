import { Component, input, model, output, signal } from "@angular/core";

@Component({
  selector: "app-card",
  imports: [],
  template: `
    <div (click)="toggle()">
      <ng-content select="app-card-title"></ng-content>
    </div>
    @if (isOpen()) {
      <ng-content select="app-card-body"></ng-content>
    }
    <ng-content select="app-card-footer"></ng-content>
  `,
  styles: ``,
})
export class Card {
  title = input<string>();
  isOpen = model(false);

  toggle() {
    this.isOpen.update((previousValue) => !previousValue);
  }
}
