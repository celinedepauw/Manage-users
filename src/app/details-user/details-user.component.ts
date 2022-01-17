import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {

  user!: User;
  userId!: string;
  updateForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      lastnameToUpdate: new FormControl(''),
      firstnameToUpdate: new FormControl(''),
      emailToUpdate: new FormControl(''),
      phoneNumberToUpdate: new FormControl('')
    });
    const routeParams = this.route.snapshot.paramMap;
    if(this.userId != ''){
      this.userId = routeParams.get('idUser')!
    }
    else{
      this.router.navigateByUrl('/home')
    }
    this.userService.getUserById(this.userId)
      .subscribe(user => {
        this.user = user,
        console.log('valeur du nom : ', this.updateForm.value.lastnameToUpdate)
        this.updateForm.setValue({
          lastnameToUpdate: user.lastName,
          firstnameToUpdate: user.firstName,
          emailToUpdate: user.email,
          phoneNumberToUpdate: user.phoneNumber,
        })
      }
      )
  }

  /* when deleting a user without confirmation in modal
  deleteUser(){
    this.userService.deleteUser(this.userId)
      .subscribe(resp => {
        this.router.navigateByUrl('/home')
      })
  }*/

  openDialogForDelete(){
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '350px',
      data: {userId: this.userId}
    });
  }

  updateUser(){
    this.userService.updateUser(
      this.userId, 
      this.updateForm.value.firstnameToUpdate, 
      this.updateForm.value.lastnameToUpdate, 
      this.updateForm.value.emailToUpdate, 
      this.updateForm.value.phoneNumberToUpdate)
        .subscribe(resp => {
          this.router.navigateByUrl('/home')
        })
    
  }

  goBackHome(){
    this.router.navigateByUrl('/home')
  }
   
}

