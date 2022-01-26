import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { ModalUpdatePasswordComponent } from './modal-update-password/modal-update-password.component';

import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoginComponent,
    ModalRegisterComponent,
    ModalUpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FlexModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  exports: [
    ModalRegisterComponent,
    ModalUpdatePasswordComponent
  ]
})
export class AuthModule { }
