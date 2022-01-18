import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {userId: string},
    public dialogRef: MatDialogRef<ModalDeleteComponent>,
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) { }

  onNoClick(){
    this.dialogRef.close();
  }

  onYesClick(){
    this.userService.deleteUser(this.data.userId)
      .subscribe(
        resp => {
        this.dialogRef.close();
        this.router.navigateByUrl('/home')
      },
      error => {
        const dialogRef = this.dialog.open(ModalErrorComponent, {
          width: '350px'
        });
      }
      )
  }

  ngOnInit(): void {
  }

}
