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
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './authInterceptorService';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { ModalUpdatePasswordComponent } from './modal-update-password/modal-update-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalErrorFormComponent } from './modal-error-form/modal-error-form.component';
import { AddPassionComponent } from './add-passion/add-passion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DetailsUserComponent,
    CreateUserComponent,
    ModalDeleteComponent,
    ModalRegisterComponent,
    ModalErrorComponent,
    ModalUpdatePasswordComponent,
    ProfileComponent,
    ModalErrorFormComponent,
    AddPassionComponent
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
    MatChipsModule,
    HttpClientModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
