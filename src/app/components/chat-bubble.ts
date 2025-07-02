import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  imports: [],
  template: `
    <div class="chat" [class]="classAlign()">
      <div class="chat-bubble" [class]="classVariant()">
        <!-- {{ title() }} -->
        <ng-content>Default content</ng-content>
        @if (button()) {
        <button class="btn ml-4" (click)="doSomething()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="size-[1.2em]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
        }
      </div>
    </div>
  `,
})
export class ChatBubble {
  // title = input('...');
  align = input<AlignType>('start');
  variant = input<Variant>('primary');
  button = input<boolean>(true);
  buttonClickEmitter = output();

  classAlign = computed(() =>
    this.align() === 'start' ? 'chat-start' : 'chat-end'
  );

  classVariant = computed(() => {
    switch (this.variant()) {
      case 'primary':
        return 'chat-bubble-primary';
      case 'secondary':
        return 'chat-bubble-secondary';
      case 'accent':
        return 'chat-bubble-accent';
      default:
        return 'chat-bubble-primary';
    }
  });

  doSomething() {
    this.buttonClickEmitter.emit();
  }
}

type AlignType = 'start' | 'end' | undefined;
type Variant = 'primary' | 'secondary' | 'accent' | undefined;
