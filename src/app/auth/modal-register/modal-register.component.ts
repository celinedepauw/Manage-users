import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Authentication } from '../authentication';
import { AuthenticationService } from '../login/services/authentication.service';
import { ModalErrorComponent } from '../../shared/modal-error/modal-error.component';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  profile!: Authentication;
  @Output() profileEmitter = new EventEmitter<Authentication>();

  constructor(
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  registerProfile(){
    if(this.registerForm.valid){
      this.profileEmitter.emit(this.registerForm.value);
    }
    else {
      this.registerForm.markAllAsTouched();
      const dialogRef = this.dialog.open(ModalErrorComponent, {
        width: '35%',
        data: {
          message: 'Veuillez remplir tous les champs'
        }
      });
    }
  }
}
