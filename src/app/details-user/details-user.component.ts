import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
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
        this.updateForm = new FormGroup({
          lastnameToUpdate: new FormControl(user.lastName),
          firstnameToUpdate: new FormControl(user.firstName),
          emailToUpdate: new FormControl(user.email),
          phoneNumberToUpdate: new FormControl(user.phoneNumber)
        });
      })
  }

  deleteUser(){
    this.userService.deleteUser(this.userId)
      .subscribe()
    this.userService.getAllUsers()
    this.router.navigateByUrl('/home')
  }

  updateUser(){
    this.userService.updateUser(this.userId, this.updateForm.value.firstnameToUpdate, this.updateForm.value.lastnameToUpdate, this.updateForm.value.emailToUpdate, this.updateForm.value.phoneNumberToUpdate)
      .subscribe()
    this.userService.getAllUsers()
    this.router.navigateByUrl('/home')
  }

  goBackHome(){
    this.router.navigateByUrl('/home')
  }
   
}

