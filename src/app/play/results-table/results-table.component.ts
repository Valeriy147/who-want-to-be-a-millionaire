import { PAY } from './../constances/pay.constance';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Component, Input, inject } from '@angular/core';
import { GameFeature } from 'src/app/store/game.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { IPieOptions, ISettings } from 'src/app/interfaces/settings.interfaces';

@Component({
  standalone: true,
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
  imports: [SharedModule, CommonModule],
})
export class ResultsTableComponent {
  private store = inject(Store)
  public actualStep = this.store.select(GameFeature.selectNumberOfActualQuestion)
  public settings: Observable<ISettings> = this.store.select(GameFeature.selectSettings)
  public pay: IPieOptions = PAY;
}
