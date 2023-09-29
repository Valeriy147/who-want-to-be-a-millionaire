import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import { SharedModule } from '../shared/shared.module';
import { getNumbersOfQuestions, setGameSettings, setQuestions } from '../store/game.actions';
import { fade } from '../shared/animations/fadeanumation';
import { GameFeature } from '../store/game.reducer';
import { getRandomQuestions } from '../shared/functions/questions-generation.function';

@Component({
  standalone: true,
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss'],
  imports: [CommonModule, SharedModule],
  animations: [ fade ],
})
export class CreationComponent implements OnInit {

  private _fb: FormBuilder = inject(FormBuilder)
  private _store: Store = inject(Store)
  private _router: Router = inject(Router);

  public questionsForm!: FormGroup;
  public settingsForm!: FormGroup;
  public numbers$: Observable<number[] | null> = this._store.select(GameFeature.selectNumbersOfQuestions);
  public isLoading$: Observable<boolean> = this._store.select(GameFeature.selectLoading);
  public error$: Observable<string | null> = this._store.select(GameFeature.selectError);
  public randomQuestions: boolean = false;

  public ngOnInit(): void {
    this._store.dispatch(getNumbersOfQuestions())
    this._settingsFormInit();
    this._questionsFormInit();
  }

  private _settingsFormInit(): void {
    this.settingsForm = this._fb.group({
      questionsNumber: this._fb.control(4),
      fiftyFifty: this._fb.control(false),
      help: this._fb.control(false),
    });
  }

  private _questionsFormInit(): void {
    const quantity: number = this.settingsForm.get('questionsNumber')?.value;
    this.questionsForm = this._fb.group({
      questions: this._fb.array([]),
    });

    for (let i = 0; i < quantity; i++) {
      this.addQuestion();
    };
  }

  public addQuestion(): void {
    const question = this._fb.group({
      question: ['', Validators.required],
      a: ['', Validators.required],
      b: ['', Validators.required],
      c: ['', Validators.required],
      d: ['', Validators.required],
      answer: ['', Validators.required],
    });

    this.questions.push(question);
  }

  public onSubmit(): void {
    if( this.questionsForm.invalid && !this.randomQuestions){
      return;
    }

    if (!this.randomQuestions) {
      this._store.dispatch(setQuestions({ questions: this.questions.value }));
      this._store.dispatch(setGameSettings({ settings: this.settingsForm.value}));
      this._router.navigate(['/play']);
    } else {
      this._store.dispatch(setQuestions({ questions: getRandomQuestions(this.settingsForm.value.questionsNumber) }));
      this._store.dispatch(setGameSettings({ settings: this.settingsForm.value}));
      this._router.navigate(['/play']);
    }

  }

  public changeNumberOfQuestions(): void{
    this._questionsFormInit();
  }

  public chooseCorrectAnswer(index: number, value: string): void {
    const questionArray = this.questionsForm.get('questions') as FormArray;
    const questionControl = questionArray.controls[index] as FormGroup;
    questionControl.controls['answer'].setValue(value)
  }

  public checkValue( question: any, letter: string ): string {
    if( question.controls['answer'].value && question.controls['answer'].value === letter ) {
      return 'trueValue'
    } else if( question.controls['answer'].value ) {
      return 'falseValue'
    } else return '';
  }

  get questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }
}
