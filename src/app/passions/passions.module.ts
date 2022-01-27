import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPassionComponent } from './add-passion/add-passion.component';
import { SharedModule } from '../shared/shared.module';
import { PassionsFacade } from './passions.facade';

@NgModule({
  declarations: [
    AddPassionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    PassionsFacade
  ]
})
export class PassionsModule { }
