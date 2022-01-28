import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPassionComponent } from './components/add-passion/add-passion.component';
import { SharedModule } from '../shared/shared.module';
import { PassionsFacade } from './passions.facade';
import { PassionsRoutingModule } from './passions-routing.module';
import { PassionsContainerComponent } from './containers/passions-container/passions-container.component';

@NgModule({
  declarations: [
    AddPassionComponent,
    PassionsContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PassionsRoutingModule
  ],
  providers: [
    PassionsFacade
  ]
})
export class PassionsModule { }
