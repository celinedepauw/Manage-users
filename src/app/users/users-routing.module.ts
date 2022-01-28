import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from '../shared/utils/logged.guard';

import { CreateUserComponent } from './components/create-user/create-user.component'; 
import { DetailsUserComponent } from './components/details-user/details-user.component';
import { HomeComponent } from './components/home/home.component';
import { UsersContainerComponent } from './containers/users-container/users-container.component';

const routes: Routes = [
    {
        path:'',
        component: UsersContainerComponent,
        canActivate: [LoggedGuard],
        children: [
            {
                path:'home',
                component: HomeComponent,
            },
            {
                path:'details/:idUser',
                component: DetailsUserComponent
            },
            {
                path:'create',
                component: CreateUserComponent
            },
            {
                path:'**',
                redirectTo:'home',
                pathMatch:'full'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }