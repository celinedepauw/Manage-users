import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { HomeComponent } from './home/home.component';

import { SharedModule } from '../shared/shared.module';
import { UsersFacade } from './users.facade';

@NgModule({
  declarations: [
    CreateUserComponent,
    DetailsUserComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    UsersFacade
  ]
})
export class UsersModule { }
