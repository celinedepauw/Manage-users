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
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './shared/utils/authInterceptorService';
import { AuthenticationService } from './auth/authentication.service';
import { UserService } from './users/services/user.service';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { DetailsUserComponent } from './users/details-user/details-user.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { ModalDeleteComponent } from './shared/modal-delete/modal-delete.component';
import { ModalRegisterComponent } from './auth/modal-register/modal-register.component';
import { ModalErrorComponent } from './shared/modal-error/modal-error.component';
import { ModalUpdatePasswordComponent } from './auth/modal-update-password/modal-update-password.component';
import { ProfileComponent } from './profile/profile.component';
import { AddPassionComponent } from './passions/add-passion/add-passion.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';

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
    MatNativeDateModule,
    MatIconModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
