import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, delay } from 'rxjs';
import { IPayOptions } from 'src/app/interfaces/settings.interfaces';
import { PAY } from '../constances/pay.constance';
import { NUMBERS_OF_QUESTIONS } from 'src/app/creation/creation.constance';


@Injectable({
  providedIn: 'root',
})

export class PlayService {

  constructor(private _http: HttpClient) { }


  public getPayOptions(): Observable<IPayOptions> {
    // const url = `/api/pie-options`;
    // return this._http.get<IPieOptions>(url);
    return of(PAY).pipe(
      delay(1000),
    );
  }

  public getNumbersOfQuestions(): Observable<number[]> {
    // const url = `/api/number-of-questions`;
    // return this._http.get<number[]>(url);
    return of(NUMBERS_OF_QUESTIONS).pipe(
      delay(1000),
    );
  }

}
