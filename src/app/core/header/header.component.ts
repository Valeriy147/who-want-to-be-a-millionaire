import { startOver } from './../../store/game.actions';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { newGame } from 'src/app/store/game.actions';
import { Router } from '@angular/router';
import { HintsService } from 'src/app/shared/services/hints.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [SharedModule, CommonModule]

})
export class HeaderComponent {
  private store = inject(Store)
  private router = inject(Router);
  private hintsService = inject(HintsService);

  public newGame(): void {
    this.store.dispatch(newGame())
    this.router.navigate(['/creation']);
  }

  public startOver(): void {
    this.store.dispatch(startOver());
    this.router.navigate(['/play']);
    this.hintsService.resetData();
  }

  public out() {
    this.store.dispatch(newGame())
    this.router.navigate(['/greetings']);
  }
}
