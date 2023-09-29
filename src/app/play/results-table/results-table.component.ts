import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GameFeature } from '../../store/game.reducer';
import { SharedModule } from '../../shared/shared.module';
import { IPayOptions, ISettings } from '../../interfaces/settings.interfaces';

@Component({
  standalone: true,
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
  imports: [SharedModule, CommonModule],
})
export class ResultsTableComponent {
  private _store = inject(Store)
  public actualStep = this._store.select(GameFeature.selectNumberOfActualQuestion)
  public settings: Observable<ISettings> = this._store.select(GameFeature.selectSettings)
  public pay$: Observable<IPayOptions | null> = this._store.select(GameFeature.selectPayData);
}
