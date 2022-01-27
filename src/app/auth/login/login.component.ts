import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { ModalErrorComponent } from '../../shared/modal-error/modal-error.component';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { AuthFacade } from '../auth.facade';

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
    private authFacade: AuthFacade
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(){
    if(this.loginForm.valid){
      this.authFacade.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (resp: any) => {
          localStorage.setItem('app_token', resp.accessToken)
          localStorage.setItem('user_id', resp.user._id)
          this.router.navigateByUrl('/home')
          console.log('token :', localStorage.getItem('app_token'))
        },
        error => {
          const dialogRef = this.dialog.open(ModalErrorComponent, {
            width: '35%',
            data: {
              message: 'Il y a eu une erreur, veuillez réessayer'
            }
          });
        } 
      )
      }
    else{
      this.loginForm.markAllAsTouched();
      const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '35%',
      data: {
        message: 'Veuillez remplir tous les champs'
      }
      });
    }
  }

  openModalToRegister(){
    const dialogRef = this.dialog.open(ModalRegisterComponent, {
      width: '35%',
    });
    dialogRef.componentInstance.profileEmitter.subscribe(
      form => {
        this.authFacade.register(form).subscribe(
          (resp: any) => {
          localStorage.setItem('app_token', resp.accessToken);
          localStorage.setItem('user_id', resp.user._id);
          this.dialog.closeAll();
          this.router.navigateByUrl('/home')
      },
      error => {
        const dialogRef = this.dialog.open(ModalErrorComponent, {
          width: '35%',
          data: {
            message: 'Il y a eu une erreur, veuillez réessayer'
          }
        });
      }
    )       
      }
    );
  }
}
