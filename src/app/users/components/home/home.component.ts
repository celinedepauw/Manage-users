import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Observable, map, startWith, tap, mergeMap, filter, from, of, forkJoin, switchMap } from 'rxjs';
import { Passion } from 'src/app/passions/passion';
import { PassionsFacade } from 'src/app/passions/passions.facade';
import { PassionsStore } from 'src/app/passions/state/passions.store';
import { User } from '../../../users/state/user.model';
import { UsersFacade } from '../../users.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //users$!: User[];
  users$!: Observable<User[]>;
  searchForm!: FormGroup;
  options!: Options;

  filteredUsers$!: Observable<User[]>;

  passions$!: Observable<Passion[]>;

  passionsForOneUser$!: Observable<Passion[]>;

  userWithPassions$!: Observable<UserWithPassions>;
  
  constructor(
    private router: Router,
    private usersFacade: UsersFacade,
    private passionsFacade: PassionsFacade,
    private store: PassionsStore
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

    /* 2 lignes fonctionnent :
    this.users$ = this.usersFacade.allUsers$
    this.usersFacade.getAllUsers().subscribe()
    */

    this.usersFacade.getAllUsers().subscribe()
    this.users$ = this.usersFacade.allUsers$.pipe(
      switchMap(users =>
        combineLatest([
          of(users),
          forkJoin(users.map(user => this.passionsFacade.getPassionsForUser(user._id!)))
        ])
      ),
      map(([users, passions]) => {
        let allPassions: Passion[] = [];
        for(let i = 0; i < users.length; i ++){
          allPassions = allPassions.concat(passions[i])
        }
        //console.log('tableau passions : ', allPassions)
        this.store.update(state => ({
          passions: [...allPassions]
        }))
        return users;
      }) 
    )
 
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

interface UserWithPassions extends User {
  passions: Passion[]
}
