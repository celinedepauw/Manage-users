import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Authentication } from '../authentication';
import { AuthenticationService } from '../authentication.service';

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
    this.profile = {
      firstName: this.registerForm.value.firstname,
      lastName: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber,
      password: this.registerForm.value.password,
    }
    this.authService.register(this.profile)
      .subscribe(resp => {
        this.dialogRef.close(),
        this.router.navigateByUrl('/home')
      })
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
