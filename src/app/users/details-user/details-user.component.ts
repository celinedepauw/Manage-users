import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalDeleteComponent } from '../../shared/modal-delete/modal-delete.component';
import { ModalErrorComponent } from '../../shared/modal-error/modal-error.component';
import { Passion } from '../../passions/passion';
import { PassionService } from '../../passions/passion.service';
import { User } from '../user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {

  user!: User;
  userId!: string;
  updateForm!: FormGroup;

  passions$!: Observable<Passion[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private passionService: PassionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.passions$ = this.passionService._passions.asObservable();
    
    this.updateForm = new FormGroup({
      lastnameToUpdate: new FormControl(''),
      firstnameToUpdate: new FormControl(''),
      emailToUpdate: new FormControl(''),
      phoneNumberToUpdate: new FormControl('')
    });
    const routeParams = this.route.snapshot.paramMap;
    if(this.userId != ''){
      this.userId = routeParams.get('idUser')!
    }
    else{
      this.router.navigateByUrl('/home')
    }
    this.userService.getUserById(this.userId)
      .subscribe(
        user => {
        this.user = user,
        this.updateForm.patchValue({
          lastnameToUpdate: user.lastName,
          firstnameToUpdate: user.firstName,
          emailToUpdate: user.email,
          phoneNumberToUpdate: user.phoneNumber,
        })
      },
      error => {
        const dialogRef = this.dialog.open(ModalErrorComponent, {
          width: '35%',
          data: {
            message: 'Il y a eu une erreur, veuillez réessayer'
          }
        });
      }
      )
    this.passionService.getPassionsForUser(this.userId)
      .subscribe(
        resp => {this.passionService._passions.next(resp)},
        error => {console.log('retour réponse erreur :', error)}
        )
  }

  goToAddAPassion(){
    this.router.navigateByUrl(`/add_passion/${this.userId}`);
  }

  openModalForDelete(idPassion?: string){
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '35%',
      data: {
        title: idPassion ? 'Passion' : 'Utilisateur',
        typeOfModal: 'Suppression',
        userId: this.userId,
        passionId: idPassion,
      }
    });
    dialogRef.componentInstance.confirmEmitter.subscribe(
      () => {
        if(idPassion){
          this.passionService.deletePassion(this.userId, idPassion).subscribe(
            resp =>{
              close();
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
            }
          )
        }
        else {
          this.userService.deleteUser(this.userId)
          .subscribe(
            resp => {
            close();
            this.router.navigateByUrl('/home')
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
    this.userService.updateUser(
      this.userId, 
      this.updateForm.value.firstnameToUpdate, 
      this.updateForm.value.lastnameToUpdate, 
      this.updateForm.value.emailToUpdate, 
      this.updateForm.value.phoneNumberToUpdate)
        .subscribe(
          resp => {
          this.router.navigateByUrl('/home')
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
  
    /* Avant d'utiliser DatePicker : quand input type était date :
    const dateStr = datetime.split('T')
    const dateArr = dateStr[0].split('-')
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`*/
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
    this.router.navigateByUrl(`/add_passion/${this.userId}/${passionId}`)
  }

}

