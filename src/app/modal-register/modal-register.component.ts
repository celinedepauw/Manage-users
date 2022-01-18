import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Authentication } from '../authentication';
import { AuthenticationService } from '../authentication.service';
import { ModalErrorFormComponent } from '../modal-error-form/modal-error-form.component';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  profile!: Authentication;

  constructor(
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      lastname: new FormControl(''),
      firstname: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      password: new FormControl('')
    })
  }

  registerProfile(){
    if(this.registerForm.value.firstname !='' && this.registerForm.value.lastname !='' && this.registerForm.value.email != '' && this.registerForm.value.phoneNumber != '' && this.registerForm.value.password != ''){
      this.profile = {
        firstName: this.registerForm.value.firstname,
        lastName: this.registerForm.value.lastname,
        email: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.phoneNumber,
        password: this.registerForm.value.password,
      }
      this.authService.register(this.profile)
        .subscribe(
          (resp: any) => {
          localStorage.setItem('app_token', resp.accessToken),
          localStorage.setItem('user_id', resp.user._id),
          this.dialogRef.close(),
          this.router.navigateByUrl('/home')
        },
        error => {
          const dialogRef = this.dialog.open(ModalErrorComponent, {
            width: '350px'
          });
        }
        )
    }
    else {
      const dialogRef = this.dialog.open(ModalErrorFormComponent, {
        width: '350px'
        });
    }
    
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
