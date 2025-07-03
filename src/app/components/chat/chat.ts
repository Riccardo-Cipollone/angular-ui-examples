import { Component, signal } from '@angular/core';
import { ChatBubble } from '../chat-bubble';

export type ChatItem = {
  text: string;
  button: boolean;
  buttonClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  align?: 'start' | 'end';
};

@Component({
  selector: 'app-chat',
  imports: [ChatBubble],
  template: `
    <div class="max-w-screen-sm mx-6 sm:mx-auto">
      <!-- <app-chat-bubble (buttonClickEmitter)="onButtonClickHandler($event)">
        <em>Lorem ipsum dolor sit.</em>
      </app-chat-bubble>
      <app-chat-bubble
        align="end"
        variant="secondary"
        (buttonClickEmitter)="onButtonClickHandler($event)"
      >
        <strong>Grassetto!</strong>
      </app-chat-bubble>
      <app-chat-bubble variant="accent" [button]="false" /> -->
      @for (msg of chat(); track $index) {
      <app-chat-bubble
        [align]="msg.align"
        [variant]="msg.variant"
        [button]="msg.button"
        (buttonClickEmitter)="onButtonClickHandler($event, $index)"
      >
        {{ msg.text }}
      </app-chat-bubble>
      }
    </div>
  `,
  styles: ``,
})
export class Chat {
  chat = signal<ChatItem[]>([
    {
      text: 'Hello World!',
      button: true,
    },
    {
      text: 'Fine Thanks!',
      variant: 'secondary',
      align: 'end',
      button: true,
    },
    {
      text: 'Great!',
      variant: 'accent',
      align: 'start',
      button: false,
    },
  ]);

  onButtonClickHandler(event: unknown, index: number) {
    console.log(`Button clicked: ${index}`, event);
  }
}
