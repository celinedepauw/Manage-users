import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DetailsUserComponent } from './components/details-user/details-user.component';
import { HomeComponent } from './components/home/home.component';

import { SharedModule } from '../shared/shared.module';
import { UsersFacade } from './users.facade';
import { UsersRoutingModule } from './users-routing.module';
import { UsersContainerComponent } from './containers/users-container/users-container.component';

@NgModule({
  declarations: [
    CreateUserComponent,
    DetailsUserComponent,
    HomeComponent,
    UsersContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  providers: [
    UsersFacade
  ]
})
export class UsersModule { }
