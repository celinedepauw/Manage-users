import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPassionComponent } from './add-passion/add-passion.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users/:idUser', component: DetailsUserComponent },
  { path: 'create', component: CreateUserComponent },
  { path: 'profile/:idUser', component: ProfileComponent},
  { path: 'add_passion', component: AddPassionComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
