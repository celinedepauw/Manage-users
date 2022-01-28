import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ModalRegisterComponent } from './components/modal-register/modal-register.component';
import { ModalUpdatePasswordComponent } from './components/modal-update-password/modal-update-password.component';
import { SharedModule } from '../shared/shared.module';
import { AuthFacade } from './auth.facade';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthContainerComponent } from './containers/auth-container/auth-container.component';

@NgModule({
  declarations: [
    LoginComponent,
    ModalRegisterComponent,
    ModalUpdatePasswordComponent,
    AuthContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule  
  ],
  exports: [
    ModalRegisterComponent,
    ModalUpdatePasswordComponent
  ],
  providers: [
    AuthFacade
  ]
})
export class AuthModule { }
