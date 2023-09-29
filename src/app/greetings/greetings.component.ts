import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { fade } from '../shared/animations/fadeanumation';

@Component({
  standalone: true,
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss'],
  imports: [ CommonModule, SharedModule ],
  animations: [ fade ],
})
export class GreetingsComponent {
}


