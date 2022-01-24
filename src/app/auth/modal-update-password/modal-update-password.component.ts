import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ModalErrorComponent } from '../../shared/modal-error/modal-error.component';

@Component({
  selector: 'app-modal-update-password',
  templateUrl: './modal-update-password.component.html',
  styleUrls: ['./modal-update-password.component.scss']
})
export class ModalUpdatePasswordComponent implements OnInit {

  @Output() updateEmitter = new EventEmitter<{previous: string, current: string}>();

  updatePasswordForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalUpdatePasswordComponent>,
  ) { }

  ngOnInit(): void {
    this.updatePasswordForm = new FormGroup({
      previousPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    })
  }

  updatePassword(){
    if(this.updatePasswordForm.valid){
      this.updateEmitter.emit(this.updatePasswordForm.value)
    }
    else {
      const dialogRef = this.dialog.open(ModalErrorComponent, {
        width: '350px',
        data: {
          message: 'Veuillez remplir tous les champs'
        }
        });
    }
    /*if( this.updatePasswordForm.value.previousPassword != '' && this.updatePasswordForm.value.newPassword != ''){
      this.authService.updatePassword(
        this.updatePasswordForm.value.previousPassword,
        this.updatePasswordForm.value.newPassword
      ).subscribe(
        resp => {
          this.dialogRef.close(),
          this.router.navigateByUrl('/home')
        },
        error => {
          const dialogRef = this.dialog.open(ModalErrorComponent, {
            width: '35%'
          });
        } 
      )
    }
    else {
      const dialogRef = this.dialog.open(ModalErrorFormComponent, {
        width: '350px'
        });
    }*/
  }
}
