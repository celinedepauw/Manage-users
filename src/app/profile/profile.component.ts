import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { ModalErrorComponent } from '../shared/modal-error/modal-error.component';
import { ModalUpdatePasswordComponent } from '../auth/modal-update-password/modal-update-password.component';
import { User } from '../users/user';
import { UserService } from '../users/services/user.service';

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
    private authService: AuthenticationService,
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
      this.router.navigateByUrl('/home')

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

  // mettre this.profileForm.value dans updateProfile()
  updateProfile(){
    this.authService.updateProfile(
      this.profileId,
      this.profileForm.value.firstname,
      this.profileForm.value.lastname,
      this.profileForm.value.email,
      this.profileForm.value.phoneNumber
    ).subscribe(
      resp => {
      this.router.navigateByUrl('/home')
    },
      error => {
        const dialogRef = this.dialog.open(ModalErrorComponent, {
          width: '35%',
          data: {
            message: 'Le profil n\'a pas pu être mis à jour'
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
    dialogRef.componentInstance.updateEmitter.subscribe((data: {previous: string, current: string}) => {
      this.authService.updatePassword(data.previous, data.current)
        .subscribe(
          resp => {
            close();
            this.router.navigateByUrl('/home')
          },
          error => {
            const dialogRef = this.dialog.open(ModalErrorComponent, {
              width: '35%',
              data: {
                message: 'Le mot de passe n\'a pas pu être mis à jour'
              }
            });
          }
        )
    })
  }
}
