import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';

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
    MatDialogModule,
    MaterialModule,
  ],
  exports: [
    ModalDeleteComponent,
    ModalErrorComponent,
    MaterialModule
  ]
})
export class SharedModule { }
