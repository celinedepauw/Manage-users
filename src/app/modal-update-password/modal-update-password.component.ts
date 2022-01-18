import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-modal-update-password',
  templateUrl: './modal-update-password.component.html',
  styleUrls: ['./modal-update-password.component.scss']
})
export class ModalUpdatePasswordComponent implements OnInit {

  updatePasswordForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalUpdatePasswordComponent>,
  ) { }

  ngOnInit(): void {
    this.updatePasswordForm = new FormGroup({
      previousPassword: new FormControl(''),
      newPassword: new FormControl('')
    })
  }

  updatePassword(){
    this.authService.updatePassword(
      this.updatePasswordForm.value.previousPassword,
      this.updatePasswordForm.value.newPassword
    ).subscribe(
      resp => {
        this.dialogRef.close(),
        this.router.navigateByUrl('/home')
      },
      resp => {
        alert('Il y a eu un problème, veuillez réessayer')
      } 
    )
  }
}
