import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss'],
  imports: [CommonModule, SharedModule],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1.5s ease')
      ])
    ])
  ]
})
export class GreetingsComponent {
}
export const fade = trigger('fadeIn', [
  state('in', style({ opacity: 1 })),
  transition('void => *', [
    style({ opacity: 0 }),
    animate('1.5s ease')
  ])
])
