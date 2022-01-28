import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from '../shared/utils/logged.guard';

import { AddPassionComponent } from './components/add-passion/add-passion.component';
import { PassionsContainerComponent } from './containers/passions-container/passions-container.component';

const routes: Routes = [
    {
        path:'',
        component: PassionsContainerComponent,
        canActivate: [LoggedGuard],
        children: [
            {
                path:'add/:idUser',
                component: AddPassionComponent,
            },
            {
                path:'update/:idUser/:idPassion',
                component: AddPassionComponent
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
  export class PassionsRoutingModule { }