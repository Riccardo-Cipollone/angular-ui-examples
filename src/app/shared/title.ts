import { booleanAttribute, Component, computed, input } from "@angular/core";

@Component({
  selector: "app-title",
  imports: [],
  template: `
    <!-- <h1
      [class.sizeSM]="size() === 'sm'"
      [class.sizeMD]="size() === 'md'"
      [class.sizeXL]="size() === 'xl'"
      [class.underlined]="underlined()"
    >
      <ng-content>Default title</ng-content>
    </h1> -->
    <h1 [class]="[titleSizeClass(), underlinedClass()]">
      <ng-content>Default title</ng-content>
    </h1>
  `,
  styles: `
    .sizeSM {
      font-size: 20px;
    }
    .sizeMD {
      font-size: 30px;
    }
    .sizeXL {
      font-size: 40px;
      font-weight: bold;
    }
    .underlined {
      text-decoration: underline;
    }
  `,
})
export class Title {
  size = input<"sm" | "md" | "xl">("md");
  underlined = input(false, { transform: booleanAttribute });

  titleSizeClass = computed(() => {
    switch (this.size()) {
      case "sm":
        return "sizeSM";

      case "md":
        return "sizeMD";

      case "xl":
        return "sizeXL";
    }
  });

  underlinedClass = computed(() => {
    return this.underlined() ? "underlined" : "";
  });
}
