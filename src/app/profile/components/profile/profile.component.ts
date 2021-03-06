import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalErrorComponent } from '../../../shared/modal-error/modal-error.component';
import { ModalUpdatePasswordComponent } from '../../../auth/components/modal-update-password/modal-update-password.component';
import { User } from '../../../users/user';
import { UserService } from '../../../users/services/user.service';
import { ProfileFacade } from '../../profile.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  profile!: User;
  profileId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileFacade: ProfileFacade,
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      lastname: new FormControl(''),
      firstname: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl('')
    });
    const routeParams = this.route.snapshot.paramMap;
    if(this.profileId != '')
      this.profileId = routeParams.get('idUser')!
    else
      this.router.navigateByUrl('/users/home')

    this.userService.getUserById(this.profileId)
      .subscribe(user => {
        this.profile = user,
        this.profileForm.patchValue({
          lastname: user.lastName,
          firstname: user.firstName,
          email: user.email,
          phoneNumber: user.phoneNumber
        })
      })
  }

  updateProfile(){
    this.profileFacade.updateProfile(
      this.profileId,
      this.profileForm.value.firstname,
      this.profileForm.value.lastname,
      this.profileForm.value.email,
      this.profileForm.value.phoneNumber
    ).subscribe(
      resp => {
      this.router.navigateByUrl('/users/home')
    },
      error => {
        const dialogRef = this.dialog.open(ModalErrorComponent, {
          width: '35%',
          data: {
            message: 'Le profil n\'a pas pu ??tre mis ?? jour'
          }
        });
      }  
    )
  }

  logout(){
    localStorage.removeItem('app_token')
    localStorage.removeItem('user_id')
    this.router.navigateByUrl('')
  }

  openModalToUpdatePassword(){
    const dialogRef = this.dialog.open(ModalUpdatePasswordComponent, {
      width: '35%',
    });
    dialogRef.componentInstance.updateEmitter.subscribe((data: {previousPassword: string, newPassword: string}) => {
      console.log('modif mdp', data)
      this.profileFacade.updatePassword(data.previousPassword, data.newPassword)
        .subscribe(
          resp => {
            this.dialog.closeAll();
            this.router.navigateByUrl('/home')
          },
          error => {
            const dialogRef = this.dialog.open(ModalErrorComponent, {
              width: '35%',
              data: {
                message: 'Le mot de passe n\'a pas pu ??tre mis ?? jour'
              }
            });
          }
        )
    })
  }
}
