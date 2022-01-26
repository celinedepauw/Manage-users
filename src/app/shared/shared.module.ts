import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ModalDeleteComponent,
    ModalErrorComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FlexModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    ModalDeleteComponent,
    ModalErrorComponent
  ]
})
export class SharedModule { }
