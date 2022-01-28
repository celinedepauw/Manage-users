import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { User } from '../../user';
import { UsersFacade } from '../../users.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users$!: User[];
  
  constructor(
    private router: Router,
    public usersFacade: UsersFacade
  ) {}

  ngOnInit(): void {
    this.usersFacade.getAllUsers()
      .subscribe(users => this.users$ = users)
  }

  getName(lastname: string, firstname: string){
    const firstnameUpper = firstname.charAt(0).toUpperCase() + firstname.slice(1)
    return `${lastname.toUpperCase()} ${firstnameUpper}`
  }

  goToProfile(){
    this.router.navigateByUrl(`/profile/${localStorage.getItem('user_id')}`)
  }
}
