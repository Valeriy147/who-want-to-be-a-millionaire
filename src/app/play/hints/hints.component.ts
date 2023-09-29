import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { GameFeature } from '../../store/game.reducer';
import { ISettings } from '../../interfaces/settings.interfaces';
import { HintsService } from '../../shared/services/hints.service';

@Component({
  standalone: true,
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss'],
  imports: [ CommonModule, SharedModule ],
})
export class HintsComponent {

  @Output() useHelpHint: EventEmitter<void> = new EventEmitter<void>()
  @Output() useFiftyHint: EventEmitter<void> = new EventEmitter<void>()
  private _store: Store = inject(Store);

  public hintsService: HintsService = inject(HintsService);
  public settings$: Observable<ISettings> = this._store.select(GameFeature.selectSettings)

  public useFifty(): void {
    this.hintsService.fiftyUsed = true;
    this.useFiftyHint.emit();
  }

  public useHelp(): void {
    this.hintsService.helpUsed = true;
    this.useHelpHint.emit();
  }
}
