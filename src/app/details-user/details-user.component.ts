import { Component, OnInit } from '@angular/core';
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
      .subscribe(user => this.user = user)
  }

  goBackHome(){
    this.router.navigateByUrl('/home')
  }
   
}

