import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalErrorComponent } from '../../../shared/modal-error/modal-error.component';
//import { User } from '../../user';
import { User } from '../../../users/state/user.model';
import { UsersFacade } from '../../users.facade';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  user!: User;
  createForm!: FormGroup;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private usersFacade: UsersFacade
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      lastname: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      age: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required)
    })
  }

  createUser(){
    if(this.createForm.valid){
      if(this.createForm.value.age > 0 && this.createForm.value.age <= 120){
        this.user = {
          firstName: this.createForm.value.firstname,
          lastName: this.createForm.value.lastname,
          email: this.createForm.value.email,
          password: "mdp",
          phoneNumber: this.createForm.value.phoneNumber,
          age: this.createForm.value.age,
          sex: this.createForm.value.sex 
        }
        this.usersFacade.createUser(this.user)
          .subscribe(
            resp => {
              this.router.navigateByUrl('/users/home')
            },
            error => {
              const dialogRef = this.dialog.open(ModalErrorComponent, {
                width: '35%',
                data: {
                  message: 'L\'adhérent n\'a pas pu être créé'
                }
              });
            }
          )
      }
      else {
        const dialogRef = this.dialog.open(ModalErrorComponent, {
          width: '35%',
          data: {
            message: 'L\'age doit être compris entre 1 et 120'
          }
        });
      }
    }
   else {
    this.createForm.markAllAsTouched();
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '35%',
      data: {
        message: 'Veuillez remplir tous les champs'
      }
      });
   }
  }
}
