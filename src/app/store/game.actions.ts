import { createAction, props } from '@ngrx/store';

import { GameActions } from './game.action.enum';
import { ISettings } from '../interfaces/settings.interfaces';

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

