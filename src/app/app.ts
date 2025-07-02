import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBubble } from './components/chat-bubble';

@Component({
  selector: 'app-root',
  imports: [ChatBubble],
  template: `
    <div class="max-w-screen-sm mx-auto">
      <app-chat-bubble>
        <em>Lorem ipsum dolor sit.</em>
      </app-chat-bubble>
      <app-chat-bubble align="end" variant="secondary">
        <strong>Grassetto!</strong>
      </app-chat-bubble>
      <app-chat-bubble variant="accent" />
    </div>
  `,
  styles: [],
})
export class App {
  protected title = 'angular-ui-examples';
}
