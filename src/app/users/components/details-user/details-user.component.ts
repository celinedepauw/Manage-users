import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ModalDeleteComponent } from '../../../shared/modal-delete/modal-delete.component';
import { ModalErrorComponent } from '../../../shared/modal-error/modal-error.component';
import { Passion } from '../../../passions/passion';
import { PassionService } from '../../../passions/passion.service';
import { User } from '../../user';
import { UserService } from '../../services/user.service';
import { PassionsService } from 'src/app/passions/state/passions.service';
import { PassionsStore } from 'src/app/passions/state/passions.store';
import { PassionsQuery } from 'src/app/passions/state/passions.query';
import { UsersFacade } from '../../users.facade';
import { PassionsFacade } from 'src/app/passions/passions.facade';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {

  user!: User | undefined;
  userId!: string;
  updateForm!: FormGroup;

  passions$!: Observable<Passion[]>;
  
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private usersFacade: UsersFacade,
    private userService: UserService,
    private pService: PassionsService,
    private passionsFacade: PassionsFacade,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    if(this.userId != ''){
      this.userId = routeParams.get('idUser')!
    }
    else{
      this.router.navigateByUrl('/users/home')
    }
    this.user = this.usersFacade.getUserFromStore(this.userId)
    this.passions$ = this.passionsFacade.allPassions$.pipe(
      map(passions => passions.filter(passion => passion.user._id == this.userId))
    )
    if(this.user?._id){
      this.updateForm = new FormGroup({
        lastnameToUpdate: new FormControl(this.user.lastName),
        firstnameToUpdate: new FormControl(this.user.firstName),
        emailToUpdate: new FormControl(this.user.email),
        phoneNumberToUpdate: new FormControl(this.user.phoneNumber),
        ageToUpdate: new FormControl(this.user.age),
        sexToUpdate: new FormControl(this.user.sex)
      })
    }
    else {
      const dialogRef = this.dialog.open(ModalErrorComponent, {
        width: '35%',
        data: {
          message: 'Il y a eu une erreur, veuillez r??essayer'
        }
      });
      this.router.navigateByUrl('/users/home')
    }
  }

  goToAddAPassion(){
    this.router.navigateByUrl(`/passions/add/${this.userId}`);
  }

  openModalForDelete(idPassion?: string){
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '35%',
      data: {
        title: idPassion ? 'Supprimer la passion ?' : 'Supprimer l\'utilisateur ?',
        typeOfModal: 'Suppression',
        userId: this.userId,
        passionId: idPassion,
      }
    });
    dialogRef.componentInstance.confirmEmitter.subscribe(
      () => {
        if(idPassion){
          this.passionsFacade.deletePassion(this.userId, idPassion).subscribe(
            resp => {this.dialog.closeAll()},
            error => {
              const dialogRef = this.dialog.open(ModalErrorComponent, {
                width: '35%',
                data: {
                  message: 'La passion n\'a pas pu ??tre supprim??e'
                }
              });
            }
          )
        }
        else {
          this.usersFacade.deleteUser(this.userId)
          .subscribe(
            resp => {
              this.dialog.closeAll();
              this.router.navigateByUrl('/users/home')
          },
          error => {
            const dialogRef = this.dialog.open(ModalErrorComponent, {
              width: '35%',
              data: {
                message: 'L\'adh??rent n\'a pas pu ??tre supprim??'
              }
            });
          }
          )
        } 
      }
    )
  }

  updateUser(){
    this.usersFacade.updateUser(
      this.userId, 
      this.updateForm.value.firstnameToUpdate, 
      this.updateForm.value.lastnameToUpdate, 
      this.updateForm.value.emailToUpdate, 
      this.updateForm.value.phoneNumberToUpdate,
      this.updateForm.value.ageToUpdate,
      this.updateForm.value.sexToUpdate
      )
        .subscribe(
          resp => {
          this.router.navigateByUrl('/users/home')
        },
        error => {
          const dialogRef = this.dialog.open(ModalErrorComponent, {
            width: '35%',
            data: {
              message: 'L\'adh??rent n\'a pas pu ??tre mis ?? jour'
            }
          });
        }
        )
  }

  getDate(datetime: string){
    return new Date(datetime).toLocaleDateString('fr-FR');
  }

  getInformations(infos: string){
    const infosArr = infos.split('\n')
    const informations: string[] = [];
    infosArr.forEach(element => {
      informations.push(element)
    });
    return informations;
  }

  getFirstLetterUpper(string: string){
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  goToUpdatePassion(passionId: string){
    this.router.navigateByUrl(`/passions/update/${this.userId}/${passionId}`)
  }

}

