import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from '../shared/utils/logged.guard';

import { ProfileComponent } from './components/profile/profile.component'; 
import { ProfileContainerComponent } from './containers/profile-container/profile-container.component';

const routes: Routes = [
    {
        path:'',
        component: ProfileContainerComponent,
        canActivate: [LoggedGuard],
        children: [
            {
                path:':idUser',
                component: ProfileComponent
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
  export class ProfileRoutingModule { }