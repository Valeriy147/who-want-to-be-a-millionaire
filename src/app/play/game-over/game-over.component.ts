import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedModule } from '../../shared/shared.module';
import { newGame, startOver } from '../../store/game.actions';
import { HintsService } from '../../shared/services/hints.service';
import { GameOverDialogData } from '../../interfaces/modal-data.interfaces';

@Component({
  standalone: true,
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
  imports: [ CommonModule, SharedModule ],
})
export class GameOverComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GameOverDialogData,
    private store: Store,
    private router: Router,
    private hintsService: HintsService,
  ) {
    console.log(data)
  }

  public newGame(): void {
    this.store.dispatch(newGame());
    this.router.navigate(['/creation']);
  }

  public startOver(): void {
    this.store.dispatch(startOver());
    this.router.navigate(['/play']);
    this.hintsService.resetData();
  }
}
