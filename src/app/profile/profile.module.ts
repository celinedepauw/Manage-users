import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileFacade } from './profile.facade';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    ProfileFacade
  ]
})
export class ProfileModule { }
