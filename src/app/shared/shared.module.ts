import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { LogoComponent } from '../greetings/logo/logo.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    LogoComponent,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    LogoComponent,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class SharedModule { }
