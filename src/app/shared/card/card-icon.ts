import { Component, output } from "@angular/core";

@Component({
  selector: "app-card-icon",
  imports: [],
  template: `
    <button class="cursor-pointer" (click)="onIconClick($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: ``,
})
export class CardIcon {
  iconClick = output();

  onIconClick(event: MouseEvent) {
    event.stopPropagation();
    this.iconClick.emit();
  }
}
