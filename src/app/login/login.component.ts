import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openModalToRegister(){
    const dialogRef = this.dialog.open(ModalRegisterComponent, {
      width: '350px',
    });
  }

  goToHomePage(){
    this.router.navigateByUrl('/home')
  }

}
