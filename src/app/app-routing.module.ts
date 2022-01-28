import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { LoggedGuard } from './shared/utils/logged.guard';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'users', 
    loadChildren: () => import ('./users/users.module').then(m => m.UsersModule)
  },
  { 
    path: 'profile', 
    loadChildren: () => import ('./profile/profile.module').then(m => m.ProfileModule)
  },
  { 
    path: 'passions', 
    loadChildren: () => import ('./passions/passions.module').then(m => m.PassionsModule)
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/*{ path: '', component: LoginComponent },
  { path: 'home', canActivate: [LoggedGuard], component: HomeComponent },
  { path: 'users/:idUser', canActivate: [LoggedGuard], component: DetailsUserComponent },
  { path: 'create', canActivate: [LoggedGuard], component: CreateUserComponent },
  { path: 'profile/:idUser', canActivate: [LoggedGuard], component: ProfileComponent},
  { path: 'add_passion/:idUser', canActivate: [LoggedGuard], component: AddPassionComponent },
  { path: 'add_passion/:idUser/:idPassion', canActivate: [LoggedGuard], component: AddPassionComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}*/