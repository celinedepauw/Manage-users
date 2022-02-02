import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    ModalDeleteComponent,
    ModalErrorComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FlexModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSliderModule
  ],
  exports: [
    ModalDeleteComponent,
    ModalErrorComponent,
    FlexLayoutModule,
    FlexModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSliderModule
  ]
})
export class SharedModule { }
