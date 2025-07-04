import { Component, input } from "@angular/core";

@Component({
  selector: "app-error-msg",
  imports: [],
  template: `
    @if (text()) {
      <div class="alert alert-error my-3">
        {{ text() }}
      </div>
    }
  `,
})
export class ErrorMsg {
  text = input.required<string | null>();
}
