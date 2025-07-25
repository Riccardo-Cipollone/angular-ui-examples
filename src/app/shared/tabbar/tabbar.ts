import { JsonPipe } from "@angular/common";
import { Component, input, model } from "@angular/core";

@Component({
  selector: "app-tabbar",
  imports: [JsonPipe],
  host: {
    class: "flex gap-2 my-2",
  },
  template: `
    @for (item of items(); track $index) {
      <button
        class="btn"
        [class.btn-info]="item.id === selectedItem()?.id"
        (click)="selectedItem.set(item)"
      >
        {{ item[labelField()] }}
      </button>
    }
  `,
})
export class Tabbar<T extends { id: number }, K extends keyof T> {
  items = input<T[]>([]);
  selectedItem = model<T | null>(null);
  labelField = input<K>("label" as K);
}
