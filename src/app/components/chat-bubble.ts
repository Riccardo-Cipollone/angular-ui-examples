import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  imports: [],
  template: `
    <div class="chat" [class]="classAlign()">
      <div class="chat-bubble" [class]="classVariant()">
        <!-- {{ title() }} -->
        <ng-content>Default content</ng-content>
      </div>
    </div>
  `,
})
export class ChatBubble {
  // title = input('...');
  align = input<AlignType>('start');
  variant = input<Variant>('primary');

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
    }
  });
}

type AlignType = 'start' | 'end';
type Variant = 'primary' | 'secondary' | 'accent';
