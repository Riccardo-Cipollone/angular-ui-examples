import { ChangeDetectionStrategy, Component, input } from "@angular/core";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMsg {
  text = input.required<string | null>();
}
