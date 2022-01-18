import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { ModalLoginErrorComponent } from './modal-login-error/modal-login-error.component';
import { ModalUpdatePasswordComponent } from './modal-update-password/modal-update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DetailsUserComponent,
    CreateUserComponent,
    ModalDeleteComponent,
    ModalRegisterComponent,
    ModalLoginErrorComponent,
    ModalUpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FlexModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
