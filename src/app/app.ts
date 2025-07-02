import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBubble } from './components/chat-bubble';

@Component({
  selector: 'app-root',
  imports: [ChatBubble],
  template: `
    <div class="max-w-screen-sm mx-auto">
      <app-chat-bubble title="1"></app-chat-bubble>
      <app-chat-bubble
        title="2"
        align="end"
        variant="secondary"
      ></app-chat-bubble>
      <app-chat-bubble title="3" variant="accent"></app-chat-bubble>
    </div>
  `,
  styles: [],
})
export class App {
  protected title = 'angular-ui-examples';
}
