import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';


import { getNumbersOfQuestions, getNumbersOfQuestionsFailed, getNumbersOfQuestionsSuccess, getPayData, getPayDataFailed, getPayDataSuccess } from './game.actions';
import { PlayService } from '../play/services/play.service';
import { ResponseHandlerService } from '../shared/services/response-handler.service';

export const getNumbersOfQuestions$ = createEffect(
  (
    actions$ = inject(Actions),
    playService: PlayService = inject(PlayService),
  ) =>
    actions$.pipe(
      ofType(getNumbersOfQuestions),
      mergeMap(() =>
        playService.getNumbersOfQuestions().pipe(
          map((numbers) => {
            return getNumbersOfQuestionsSuccess({
              numbers,
            });
          }),
          catchError((error: string) =>
            of(getNumbersOfQuestionsFailed({ error })),
          ),
        ),
      )
    ),

  { functional: true},
)

export const getPayData$ = createEffect(
  (
    actions$ = inject(Actions),
    playService: PlayService = inject(PlayService),
  ) =>
    actions$.pipe(
      ofType(getPayData),
      mergeMap(() =>
        playService.getPayOptions().pipe(
          map((pay) => {
            return getPayDataSuccess({
              pay,
            });
          }),
          catchError((error: string) =>
            of(getPayDataFailed({ error })),
          ),
        ),
      )
    ),

  { functional: true},
)

export const handleGetNumbersOfQuestionsSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(getNumbersOfQuestionsSuccess),
      tap(() => responseHandlerService.response({ type: 'success', content: `Дані отримано` })),
      tap(() => router.navigate(['complete']))
    ),

  { functional: true, dispatch: false },
)

export const handleGetNumbersOfQuestionsFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(getNumbersOfQuestionsFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Виникла помилка при отримані даних про питання' }))
    ),

  { functional: true, dispatch: false },
)

export const handleGetPayDataSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(getPayDataSuccess),
      tap(() => responseHandlerService.response({ type: 'success', content: `Дані отримано` })),
      tap(() => router.navigate(['complete']))
    ),

  { functional: true, dispatch: false },
)

export const handleGetPayDataFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(getPayDataFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Виникла помилка при отримані даних' }))
    ),

  { functional: true, dispatch: false },
)
