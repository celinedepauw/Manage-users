import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { UserService } from '../user.service';

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
    private userService: UserService
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
        this.profileForm.setValue({
          lastname: user.lastName,
          firstname: user.firstName,
          email: user.email,
          phoneNumber: user.phoneNumber
        })
      })
  }

  updateProfile(){
    this.authService.updateProfile(
      this.profileId,
      this.profileForm.value.firstname,
      this.profileForm.value.lastname,
      this.profileForm.value.email,
      this.profileForm.value.phoneNumber
    ).subscribe(resp =>
        this.router.navigateByUrl('/home')
    )
  }

  logout(){
    localStorage.removeItem('app_token')
    localStorage.removeItem('user_id')
    this.router.navigateByUrl('')
  }

  goBackHome(){
    this.router.navigateByUrl('/home')
  }

}
