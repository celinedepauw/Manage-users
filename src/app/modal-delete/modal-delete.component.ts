import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private userService: UserService,
    private router: Router
  ) { }

  onNoClick(){
    this.dialogRef.close();
  }

  onYesClick(){
    this.userService.deleteUser(this.data.userId)
      .subscribe(resp => {
        this.dialogRef.close();
        this.router.navigateByUrl('/home')
      })
  }

  ngOnInit(): void {
  }

}
