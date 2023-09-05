import { createReducer, on, createFeature } from '@ngrx/store';

import { IGameState } from './game.state.interfaces';
import { setQuestions, setActualQuestion, setGameSettings, nextStep, newGame, startOver } from './game.actions';

export const products = 'products';

export const productsInitialState: IGameState = {
  questions: [{
    question: '11',
    a: '1',
    b: '1',
    c: '1',
    d: '1',
    answer: 'a'
  },
  {
    question: '22',
    a: '2',
    b: '2',
    c: '2',
    d: '2',
    answer: 'b'
  },
  {
    question: '33',
    a: '3',
    b: '3',
    c: '3',
    d: '3',
    answer: 'c'
  },
  {
    question: '44',
    a: '4',
    b: '4',
    c: '4',
    d: '4',
    answer: 'd'
  }
],
  numberOfActualQuestion : 1,
  settings: {
    questionsNumber: 4,
    fiftyFifty: true,
    help: true,
  },
};

export const GameFeature = createFeature({
  name: products,
  reducer: createReducer(
    productsInitialState,

    on(setQuestions, (state: IGameState, { questions }) => ({
      ...state,
      questions: questions,
    })),

    on(setGameSettings, (state: IGameState, { settings }) => ({
      ...state,
      settings: settings,
    })),

    on(setActualQuestion, (state: IGameState, { question }) => ({
      ...state,
      numberOfActualQuestion: question,
    })),

    on(nextStep, (state: IGameState) => ({
      ...state,
      numberOfActualQuestion: state.numberOfActualQuestion + 1,
    })),

    on(newGame, (state: IGameState) => ({
      ...state,
      questions: [],
      numberOfActualQuestion : 1,
      settings: {
        questionsNumber: 4,
        fiftyFifty: false,
        help: false,
      },
    })),

    on(startOver, (state: IGameState) => ({
      ...state,
      numberOfActualQuestion : 1,
    })),
  ),
});
