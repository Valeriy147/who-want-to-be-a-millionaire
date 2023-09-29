import { createAction, props } from '@ngrx/store';

import { GameActions } from './game.action.enum';
import { IPayOptions, ISettings } from '../interfaces/settings.interfaces';

export const setQuestions = createAction(
  GameActions.SET_QUESTIONS,
  props<{ questions: any }>(),
);

export const setGameSettings = createAction(
  GameActions.SET_GAME_SETTINGS,
  props<{ settings: ISettings }>(),
);

export const setActualQuestion = createAction(
  GameActions.SET_ACTUAL_QUESTION,
  props<{ question: number }>(),
);

export const nextStep = createAction(
  GameActions.NEXT_STEP,
);

export const newGame = createAction(
  GameActions.NEW_GAME,
);

export const startOver = createAction(
  GameActions.START_OVER,
);

export const getNumbersOfQuestions = createAction(
  GameActions.GET_NUMBERS_OF_QUESTIONS,
);

export const getNumbersOfQuestionsSuccess = createAction(
  GameActions.GET_NUMBERS_OF_QUESTIONS_SUCCESS,
  props<{ numbers: number[] }>(),
);

export const getNumbersOfQuestionsFailed = createAction(
  GameActions.GET_NUMBERS_OF_QUESTIONS_FAILED,
  props<{ error: string }>(),
);

export const getPayData = createAction(
  GameActions.GET_PAY_DATA,
);

export const getPayDataSuccess = createAction(
  GameActions.GET_PAY_DATA_SUCCESS,
  props<{ pay: IPayOptions }>(),
);

export const getPayDataFailed = createAction(
  GameActions.GET_PAY_DATA_FAILED,
  props<{ error: string }>(),
);
