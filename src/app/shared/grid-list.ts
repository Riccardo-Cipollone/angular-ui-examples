import { CommonModule } from "@angular/common";
import { Component, computed, input, model, TemplateRef } from "@angular/core";

@Component({
  selector: "app-grid-list",
  imports: [CommonModule],
  template: `
    <button class="btn" (click)="viewMode.set('list')">List</button>
    <button class="btn" (click)="viewMode.set('grid')">grid</button>
    <div class="my-3" [class]="getCls()">
      @for (item of items(); track item.id) {
        <ng-container
          *ngTemplateOutlet="
            templateRef();
            context: { $implicit: item, index: $index }
          "
        ></ng-container>
      }
    </div>
  `,
})
export class GridList<T extends { id: number | string }> {
  items = input.required<T[]>();
  viewMode = model<"list" | "grid">("list");
  templateRef = input.required<TemplateRef<{ $implicit: T; index: number }>>();

  getCls = computed(() => {
    switch (this.viewMode()) {
      case "grid":
        return "grid grid-cols-2 gap-2 gap-2";
      case "list":
        return "flex gap-2";
    }
  });
}
