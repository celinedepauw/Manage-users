import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPassionComponent } from './passions/add-passion/add-passion.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { DetailsUserComponent } from './users/details-user/details-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { Passion } from './passions/passion';
import { ProfileComponent } from './profile/profile.component';
import { LoggedGuard } from './shared/utils/logged.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users/:idUser', component: DetailsUserComponent },
  { path: 'create', component: CreateUserComponent },
  { path: 'profile/:idUser', component: ProfileComponent},
  { path: 'add_passion/:idUser', component: AddPassionComponent },
  { path: 'add_passion/:idUser/:idPassion', component: AddPassionComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
