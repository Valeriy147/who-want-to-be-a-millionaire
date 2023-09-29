import { trigger, state, style, animate, transition } from '@angular/animations';

export const fade = trigger('fadeIn', [
  state('in', style({ opacity: 1 })),
  transition('void => *', [
    style({ opacity: 0 }),
    animate('1.5s ease'),
  ])
])
