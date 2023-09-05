import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HintsService {
  public fiftyUsed = false;
  public helpUsed = false;

  public resetData() {
    this.fiftyUsed = false;
    this.helpUsed = false;
  }
}
