import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { newGame, startOver } from 'src/app/store/game.actions';
import { HintsService } from 'src/app/shared/services/hints.service';

export interface GameOverDialogData {
  type: 'win' | 'lose';
  sum: number;
}

@Component({
  standalone: true,
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
  imports: [CommonModule, SharedModule],
})
export class GameOverComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GameOverDialogData,
    private store: Store,
    private router: Router,
    private hintsService: HintsService,
  ) {}

  public newGame() {
    this.store.dispatch(newGame());
    this.router.navigate(['/creation']);
  }

  public startOver() {
    this.store.dispatch(startOver());
    this.router.navigate(['/play']);
    this.hintsService.resetData();
  }
}
