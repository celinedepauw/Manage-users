import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileFacade } from './profile.facade';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileContainerComponent } from './containers/profile-container/profile-container.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileContainerComponent,
    ProfileContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ],
  providers: [
    ProfileFacade
  ]
})
export class ProfileModule { }
