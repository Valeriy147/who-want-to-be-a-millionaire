import { createReducer, on, createFeature } from '@ngrx/store';

import { IGameState } from './game.state.interfaces';
import { setQuestions, setActualQuestion, setGameSettings, nextStep, newGame, startOver, getNumbersOfQuestions, getNumbersOfQuestionsSuccess, getNumbersOfQuestionsFailed, getPayData, getPayDataSuccess, getPayDataFailed } from './game.actions';
import { DefaultQuestions, DefaultSettings } from './constance';

export const products = 'products';

export const productsInitialState: IGameState = {
  questions: DefaultQuestions,
  numberOfActualQuestion: 1,
  settings: DefaultSettings,
  numbersOfQuestions: null,
  payData: null,
  loading: false,
  error: null,
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
      settings: DefaultSettings,
    })),

    on(startOver, (state: IGameState) => ({
      ...state,
      numberOfActualQuestion : 1,
    })),

    on(getNumbersOfQuestions, (state: IGameState) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(getNumbersOfQuestionsSuccess, (state: IGameState, { numbers }) => ({
      ...state,
      loading: false,
      error: null,
      numbersOfQuestions: numbers,
    })),

    on(getNumbersOfQuestionsFailed, (state: IGameState, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(getPayData, (state: IGameState) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(getPayDataSuccess, (state: IGameState, { pay }) => ({
      ...state,
      loading: false,
      error: null,
      payData: pay,
    })),

    on(getPayDataFailed, (state: IGameState, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});
