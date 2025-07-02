import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  imports: [],
  template: `
    <div
      class="chat"
      [class.chat-start]="align() === 'start'"
      [class.chat-end]="align() === 'end'"
    >
      <div
        class="chat-bubble"
        [class.chat-bubble-primary]="variant() === 'primary'"
        [class.chat-bubble-secondary]="variant() === 'secondary'"
        [class.chat-bubble-accent]="variant() === 'accent'"
      >
        {{ title() }}
      </div>
    </div>
  `,
})
export class ChatBubble {
  title = input('...');
  align = input<AlignType>('start');
  variant = input<Variant>('primary');
}

type AlignType = 'start' | 'end';
type Variant = 'primary' | 'secondary' | 'accent';
