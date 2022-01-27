import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPassionComponent } from './add-passion/add-passion.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddPassionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PassionsModule { }
