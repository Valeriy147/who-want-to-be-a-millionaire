import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SharedModule } from '../../shared/shared.module';
import { newGame } from '../../store/game.actions';
import { HintsService } from '../../shared/services/hints.service';
import { GameFeature } from '../../store/game.reducer';
import { IQuestion } from '../../interfaces/question.interface';
import { startOver } from '../../store/game.actions';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [SharedModule, CommonModule]

})
export class HeaderComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router);
  private hintsService: HintsService = inject(HintsService);

  public questions$: Observable<IQuestion[]> = this.store.select(GameFeature.selectQuestions);
  public newGame(): void {
    this.store.dispatch(newGame());
    this.router.navigate(['/creation']);
  }

  public startOver(): void {
    this.store.dispatch(startOver());
    this.router.navigate(['/play']);
    this.hintsService.resetData();
  }

  public out(): void {
    this.store.dispatch(newGame());
    this.router.navigate(['/greetings']);
  }
}
