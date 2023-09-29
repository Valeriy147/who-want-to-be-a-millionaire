import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, tap, takeUntil } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';
import { GameFeature } from '../store/game.reducer';
import { ResultsTableComponent } from './results-table/results-table.component';
import { getPayData, nextStep } from '../store/game.actions';
import { IPayOptions, ISettings } from '../interfaces/settings.interfaces';
import { GameOverComponent } from './game-over/game-over.component';
import { HintsComponent } from './hints/hints.component';
import { getFiftyFifty } from '../shared/functions/fiftyFifty.function';
import { getHelp } from '../shared/functions/help.function';
import { HelpModalComponent } from './help-modal/help-modal.component';
import { IQuestion } from '../interfaces/question.interface';
import { DestroyDirective } from '../shared/directives/destroy.directive';

@Component({
  standalone: true,
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  imports: [CommonModule, SharedModule, ResultsTableComponent, HintsComponent],
  hostDirectives: [DestroyDirective],
})
export class PlayComponent implements OnInit {
  private _destroy$ = inject(DestroyDirective).destroy$;
  private _store: Store = inject(Store);
  private _dialog: MatDialog = inject(MatDialog);

  public showResults: boolean = false;
  public questions!: IQuestion[] ;
  public settings!: ISettings;
  public result: {letter: string, answer: boolean} = { letter: '', answer: false };
  public numberOfActualQuestion!: number;
  public pay!: IPayOptions | null;
  public submitted: boolean = false;
  public fifty: string[] = [];
  public noQuestions: boolean = false;
  public isLoading$: Observable<boolean> = this._store.select(GameFeature.selectLoading);
  public error$: Observable<string | null> = this._store.select(GameFeature.selectError);

  ngOnInit(): void {
    this._store.dispatch(getPayData());

    this._store.select(GameFeature.selectPayData)
      .pipe(
        tap((data) => (this.pay = data)),
        takeUntil(this._destroy$),
        )
      .subscribe();

    this._store
      .select(GameFeature.selectQuestions)
      .pipe(
        tap((data) => (this.questions = data)),
        takeUntil(this._destroy$),
        )
      .subscribe();

    if( !this.questions.length ) {
      this.noQuestions = true;
    };

    this._store
      .select(GameFeature.selectSettings)
      .pipe(
        tap((data) => (this.settings = data)),
        takeUntil(this._destroy$),
      )
      .subscribe();

    this._store
      .select(GameFeature.selectNumberOfActualQuestion)
      .pipe(
        tap((data) => (this.numberOfActualQuestion = data)),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public checkAnswer(letter: string) {
    if( this.submitted ) {
      return;
    }
    this.submitted = true;
    setTimeout(() => {
      if ( this.questions[this.numberOfActualQuestion - 1].answer == letter ) {
        this.result = {letter, answer: true},
        setTimeout(() => {
          this.result = { letter: '', answer: false };
          if(!this.questions[this.numberOfActualQuestion]){
            this._openGameOverDialog({type: 'win', sum: 1000000})
          } else {
            this._store.dispatch(nextStep());
          };
          this.submitted = false;
          this.fifty = [];
        }, 1500);
      } else {
        this.result = { letter, answer: false },
        setTimeout(() => {
          let payArray = [...this.pay![this.settings.questionsNumber]];
          let sum = this.numberOfActualQuestion == 1 ? 0 : payArray.reverse()[this.numberOfActualQuestion-2];
          this._openGameOverDialog({type: 'lose', sum});
          this.submitted = false;
          this.fifty = [];
          this.result = { letter: '', answer: false };
        }, 1500);
      }
    }, 1000);
  }

  public toggleResults(): void {
    this.showResults = !this.showResults;
  }

  public useHelpHint(): void {
    let answer = this.questions[this.numberOfActualQuestion-1].answer;
    this._openHelpDialog(getHelp(answer));
  }

  public useFiftyHint(): void {
    let answer = this.questions[this.numberOfActualQuestion-1].answer;
    this.fifty = getFiftyFifty(answer);
  }

  private _openGameOverDialog(obj: any): void {
    this._dialog.open(GameOverComponent, {
      width: '400px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        ...obj
      }
    });
  }

  private _openHelpDialog(answer: string): void {
    this._dialog.open(HelpModalComponent, {
      width: '400px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        answer,
      }
    });
  }
}
