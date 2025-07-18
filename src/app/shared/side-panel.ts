import { Component, computed, input, model } from "@angular/core";

@Component({
  selector: "app-side-panel",
  host: {
    "[class]": "getCls()",
  },
  template: `
    <!-- <div
      class="fixed w-56 bg-slate-500 top-0 bottom-0 px-3 z-50 transition-all"
      [class]="{
        '-left-56': !isOpen(),
        'left-0': isOpen(),
      }"
    > -->
    <div
      class="flex justify-between items-center my-2 py-2 border-b border-slate-400"
    >
      <div class="text-2xl">{{ title() }}</div>
      <button (click)="close()">❌</button>
    </div>
    <ng-content></ng-content>
    <!-- </div> -->
  `,
  styles: ``,
})
export class SidePanel {
  isOpen = model(false);
  title = input.required();

  close() {
    this.isOpen.set(false);
  }

  getCls = computed(() => {
    const baseClasses =
      "fixed w-56 bg-slate-500 top-0 bottom-0 px-3 z-50 transition-all";
    const positionClass = this.isOpen() ? "left-0" : "-left-56";
    return `${baseClasses} ${positionClass}`;
  });
}
