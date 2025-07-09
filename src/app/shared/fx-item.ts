import {
  booleanAttribute,
  Component,
  computed,
  HostBinding,
  inject,
  input,
} from "@angular/core";
import { Fx } from "./fx";

@Component({
  selector: "app-fx-item",
  imports: [],
  template: `<ng-content></ng-content>`,
  host: {
    "[class.grow]": "this.grow()",
  },
  styles: ``,
})
export class FxItem {
  grow = input(false, { transform: booleanAttribute });
  fxComponentRef = inject(Fx, { optional: true });

  constructor() {
    if (!this.fxComponentRef) {
      throw new Error("fxComponent must be initialized to use fxItems");
    } else {
      console.log(this.fxComponentRef.justify());
      console.log(this.fxComponentRef.gap());
    }
  }
  // HOST BINDING ALTERNATIVES WITH DECORATORS
  // @HostBinding() class = "grow";
  // @HostBinding()
  // get class() {
  //   return this.grow() ? "grow" : "";
  // }
}
