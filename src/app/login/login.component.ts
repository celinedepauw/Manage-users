import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ModalLoginErrorComponent } from '../modal-login-error/modal-login-error.component';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { ModalUpdatePasswordComponent } from '../modal-update-password/modal-update-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  login(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (resp: any) => {
          localStorage.setItem('app_token', resp.accessToken)
          localStorage.setItem('user_id', resp.user._id)
          this.router.navigateByUrl('/home')
        },
        error => {
          const dialogRef = this.dialog.open(ModalLoginErrorComponent, {
            width: '350px'
          });
        } 
      )
  }

  openModalToRegister(){
    const dialogRef = this.dialog.open(ModalRegisterComponent, {
      width: '350px',
    });
  }

  goToHomePage(){
    this.router.navigateByUrl('/home')
  }

}
