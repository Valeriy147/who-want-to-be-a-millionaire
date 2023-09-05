import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameFeature } from 'src/app/store/game.reducer';
import { ISettings } from 'src/app/interfaces/settings.interfaces';
import { HintsService } from 'src/app/shared/services/hints.service';

@Component({
  standalone: true,
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss'],
  imports: [CommonModule, SharedModule],
})
export class HintsComponent implements OnInit{

  @Output() useHelpHint = new EventEmitter<any>()
  @Output() useFiftyHint = new EventEmitter<any>()
  private store = inject(Store);
  public hintsService = inject(HintsService);
  public settings: Observable<ISettings> = this.store.select(GameFeature.selectSettings)

  ngOnInit(): void{
  }

  public useFifty(): void {
    this.hintsService.fiftyUsed = true;
    this.useFiftyHint.emit()
  }

  public useHelp(): void {
    this.hintsService.helpUsed = true;
    this.useHelpHint.emit()
  }
}
