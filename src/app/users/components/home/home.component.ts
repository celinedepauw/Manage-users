import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Observable, map, startWith } from 'rxjs';
//import { User } from '../../user';
import { User } from '../../../users/state/user.model';
import { UsersFacade } from '../../users.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //users$!: User[];
  users$! : Observable<User[]>;
  searchForm!: FormGroup;
  options!: Options;

  filteredUsers$!: Observable<User[]>;
  
  constructor(
    private router: Router,
    public usersFacade: UsersFacade,
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      sex: new FormControl(''),
      age: new FormControl([0, 100])
    })

    this.options = {
      floor: 0,
      ceil: 100,
      step: 10,
      translate: (value: number): string => {
        return value + ' ans';
      }
    }

    this.users$ = this.usersFacade.allUsers$
    
    this.usersFacade.getAllUsers().subscribe()

    this.filteredUsers$ = combineLatest([
      this.users$,
      this.searchForm.valueChanges.pipe(startWith({
        name: '',
        sex: '',
        age: [0, 100]
      })),
    ]).pipe(
      map(
        ([users, search]) => users.filter(user => 
            user.sex!.includes(search.sex)  
            && (user.firstName.includes(search.name) || user.lastName.includes(search.name)) 
            && user.age! >= search.age[0] && user.age! <= search.age[1]
          )        
      )
    )   
  }

  getName(lastname: string, firstname: string){
    const firstnameUpper = firstname.charAt(0).toUpperCase() + firstname.slice(1)
    return `${lastname.toUpperCase()} ${firstnameUpper}`
  }

  goToProfile(){
    this.router.navigateByUrl(`/profile/${localStorage.getItem('user_id')}`)
  }
}
