import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setGameSettings, setQuestions } from '../store/game.actions';
import { Router } from '@angular/router';
import { fade } from '../greetings/greetings.component';

@Component({
  standalone: true,
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss'],
  imports: [CommonModule, SharedModule],
  animations: [fade]

})
export class CreationComponent implements OnInit {

  private fb = inject(FormBuilder)
  private store = inject(Store)
  private router = inject(Router);

  public questionsForm!: FormGroup;
  public settingsForm!: FormGroup;
  public numbers: number[] = [
    4, 6, 8, 12, 16, 20
  ]

  public ngOnInit(): void {
    this.settingsFormInit()
    this.questionsFormInit();
  }

  private settingsFormInit(): void {
    this.settingsForm = this.fb.group({
      questionsNumber: this.fb.control(4),
      fiftyFifty: this.fb.control(false),
      help: this.fb.control(false),
    });
  }

  private questionsFormInit(): void {
    const quantity: number = this.settingsForm.get('questionsNumber')?.value
    this.questionsForm = this.fb.group({
      questions: this.fb.array([])
    });

    for (let i = 0; i < quantity; i++) {
      this.addQuestion();
    }
  }

  public addQuestion(): void {
    const questions = this.fb.group({
      question: ['', Validators.required],
      a: ['', Validators.required],
      b: ['', Validators.required],
      c: ['', Validators.required],
      d: ['', Validators.required],
      answer: ['', Validators.required]
    });

    this.questions.push(questions);
  }

  public onSubmit(): void {
    if( this.questionsForm.invalid){
      return
    }
    this.store.dispatch(setQuestions({ questions: this.questions.value }));
    this.store.dispatch(setGameSettings({ settings: this.settingsForm.value}))
    this.router.navigate(['/play']);
  }

  public changeNumberOfQuestions(): void{
    this.questionsFormInit();
  }

  public chooseCorrectAnswer(index: number, value: string) {
    const questionArray = this.questionsForm.get('questions') as FormArray;
    const questionControl = questionArray.controls[index] as FormGroup;
    questionControl.controls['answer'].setValue(value)
  }

  public checkValue( question: any, letter: string ) {
    if( question.controls['answer'].value && question.controls['answer'].value === letter ) {
      return 'trueValue'
    } else if( question.controls['answer'].value ) {
      return 'falseValue'
    } else return
  }

  get questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }
}
