import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';

interface HelpDialogData {
  answer: string;
}

@Component({
  standalone: true,
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss'],
  imports: [CommonModule, SharedModule],
})
export class HelpModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: HelpDialogData,
  ) {}
}
