import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { ModalUpdatePasswordComponent } from './modal-update-password/modal-update-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    ModalRegisterComponent,
    ModalUpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule  
  ],
  exports: [
    ModalRegisterComponent,
    ModalUpdatePasswordComponent
  ]
})
export class AuthModule { }
