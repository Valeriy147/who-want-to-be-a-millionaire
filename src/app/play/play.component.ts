import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Store } from '@ngrx/store';
import { GameFeature } from '../store/game.reducer';
import { Observable, tap } from 'rxjs';
import { ResultsTableComponent } from './results-table/results-table.component';
import { nextStep } from '../store/game.actions';
import { IPieOptions, ISettings } from '../interfaces/settings.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { GameOverComponent } from './game-over/game-over.component';
import { PAY } from './constances/pay.constance';
import { HintsComponent } from './hints/hints.component';
import { getFiftyFifty } from '../shared/functions/fiftyFifty.function';
import { getHelp } from '../shared/functions/help.function';
import { HelpModalComponent } from './help-modal/help-modal.component';

@Component({
  standalone: true,
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  imports: [CommonModule, SharedModule, ResultsTableComponent, HintsComponent],
})
export class PlayComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  public questions: any;
  public settings!: ISettings;
  public result: {letter: string, answer: boolean} = { letter: '', answer: false };
  public numberOfActualQuestion!: number;
  public pay: IPieOptions = PAY;
  public submitted: boolean = false;
  public fifty: string[] = [];

  ngOnInit(): void {
    this.store
      .select(GameFeature.selectQuestions)
      .pipe(tap((data) => (this.questions = data)))
      .subscribe();

    this.store
      .select(GameFeature.selectSettings)
      .pipe(tap((data) => (this.settings = data)))
      .subscribe();

    this.store
      .select(GameFeature.selectNumberOfActualQuestion)
      .pipe(tap((data) => (this.numberOfActualQuestion = data)))
      .subscribe();
  }


  checkAnswer(letter: string) {
    if( this.submitted ) {
      return;
    }
    this.submitted = true;
    setTimeout(() => {
      if (this.questions[this.numberOfActualQuestion - 1].answer == letter) {
        this.result = {letter, answer: true},
        setTimeout(() => {
          this.result = { letter: '', answer: false };
          if(!this.questions[this.numberOfActualQuestion]){
            this.openGameOverDialog({type: 'win', sum: 1000000})
          } else {
            this.store.dispatch(nextStep());
          };
          this.submitted = false;
          this.fifty = [];
        }, 1500)

      } else {
        this.result = { letter, answer: false },
        setTimeout(() => {
          let payArray = [...this.pay[this.settings.questionsNumber]];
          this.openGameOverDialog({type: 'lose', sum: payArray.reverse()[this.numberOfActualQuestion-1]});
          this.submitted = false;
          this.fifty = [];
          this.result = { letter: '', answer: false };
        }, 1500);
      }
    }, 1000)
  }

  openGameOverDialog(obj: any): void {
    this.dialog.open(GameOverComponent, {
      width: '400px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        ...obj
      }
    });
  }

  openHelpDialog(answer: string): void {
    this.dialog.open(HelpModalComponent, {
      width: '400px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        answer,
      }
    });
  }

  useHelpHint() {
    let answer = this.questions[this.numberOfActualQuestion-1].answer;
    this.openHelpDialog(getHelp(answer));
  }

  useFiftyHint() {
    let answer = this.questions[this.numberOfActualQuestion-1].answer;
    this.fifty = getFiftyFifty(answer);
  }
}
