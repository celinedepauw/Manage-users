import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      lastname: new FormControl(''),
      firstname: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl('')
    })
  }

  createUser(){
    this.user = {
      firstName: this.createForm.value.firstname,
      lastName: this.createForm.value.lastname,
      email: this.createForm.value.email,
      password: "mdp",
      phoneNumber: this.createForm.value.phoneNumber 
    }
    this.userService.createNewUser(this.user)
      .subscribe()

    this.router.navigateByUrl('/home')
  }

  goBackHome(){
    this.router.navigateByUrl('/home')
  }

  /*createUser(){
    //console.log('soumission formulaire OK');
    this.userService.createNewUser(
      this.createForm.value.lastname,
      this.createForm.value.firstname,
      this.createForm.value.email,
      "mot de passe",
      this.createForm.value.phoneNumber 
      )
      .subscribe(user => console.log(user))

    this.router.navigateByUrl('/home')
  }*/
}
