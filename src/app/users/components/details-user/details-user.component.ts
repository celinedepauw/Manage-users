import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
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
    private passionsQuery: PassionsQuery
  ) { }

  ngOnInit(): void {
    // sans le store avec behaviorSubject : this.passions$ = this.passionService._passions.asObservable();
    this.passions$ = this.passionsFacade.allPassions$
    this.updateForm = new FormGroup({
      lastnameToUpdate: new FormControl(''),
      firstnameToUpdate: new FormControl(''),
      emailToUpdate: new FormControl(''),
      phoneNumberToUpdate: new FormControl(''),
      ageToUpdate: new FormControl(''),
      sexToUpdate: new FormControl('')
    });
    const routeParams = this.route.snapshot.paramMap;
    if(this.userId != ''){
      this.userId = routeParams.get('idUser')!
    }
    else{
      this.router.navigateByUrl('/users/home')
    }
    this.user = this.usersFacade.getUserFromStore(this.userId)
      if(this.user?._id){
        this.updateForm.patchValue({
          lastnameToUpdate: this.user.lastName,
          firstnameToUpdate: this.user.firstName,
          emailToUpdate: this.user.email,
          phoneNumberToUpdate: this.user.phoneNumber,
          ageToUpdate: this.user.age,
          sexToUpdate: this.user.sex
       
      })
      }
      else {
        const dialogRef = this.dialog.open(ModalErrorComponent, {
          width: '35%',
          data: {
            message: 'Il y a eu une erreur, veuillez réessayer'
          }
        });
        this.router.navigateByUrl('/users/home')
      }
   
    /* sans le store, avec le behaviorSubject :
    this.passionService.getPassionsForUser(this.userId)
      .subscribe(
        resp => {this.passionService._passions.next(resp)},
        error => {console.log('retour réponse erreur :', error)}
        )*/
    this.passionsFacade.getPassionsForUser(this.userId).subscribe()
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
                  message: 'La passion n\'a pas pu être supprimée'
                }
              });
            }

            /* delete sans le store :
            resp =>{
              this.dialog.closeAll();
              this.passionService.getPassionsForUser(this.userId)
            .subscribe(
              resp2 => {this.passionService._passions.next(resp2)},
              error => {console.log('retour réponse erreur :', error)}
              )
            },
            error => {
              const dialogRef = this.dialog.open(ModalErrorComponent, {
                width: '35%',
                data: {
                  message: 'La passion n\'a pas pu être supprimée'
                }
              });
            }*/
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
                message: 'L\'adhérent n\'a pas pu être supprimé'
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
              message: 'L\'adhérent n\'a pas pu être mis à jour'
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

