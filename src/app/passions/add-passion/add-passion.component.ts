import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Passion } from '../passion';
import { PassionService } from '../passion.service';
import {MatChipInputEvent} from '@angular/material/chips';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'src/app/shared/modal-error/modal-error.component';

@Component({
  selector: 'app-add-passion',
  templateUrl: './add-passion.component.html',
  styleUrls: ['./add-passion.component.scss']
})
export class AddPassionComponent implements OnInit {

  passion!: Passion;
  passionId!: string;
  passions$!: Observable<Passion[]>;
  userId!: string;
  passionForm!: FormGroup;
  examplesChips!: string[];
  title!: string;
  addOnBlur = true;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passionService: PassionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.examplesChips = [];
    this.title = 'Création d\'une nouvelle passion';
    this.passions$ = this.passionService._passions.asObservable();
    this.passionForm = new FormGroup({
      libelle: new FormControl(''),
      informations: new FormControl(''),
      date: new FormControl(''),
      examples: new FormControl('')     
    });
    const routeParams = this.route.snapshot.paramMap;
    if(routeParams.get('idUser')){
      this.userId = routeParams.get('idUser')!
        if(routeParams.get('idPassion')){
          this.title = 'Mise à jour de la passion'
          this.passionId = routeParams.get('idPassion')!
          const goodPassion = this.passionService._passions.getValue().find(passion => this.passionId == passion._id)
          if(!!goodPassion && goodPassion._id){
            this.passion = goodPassion
            if(this.passion.examples.length >= 2 || (this.passion.examples.length == 1 && this.passion.examples[0] != '')){
              this.examplesChips = this.passion.examples
            }
            this.passionForm.patchValue({
              libelle: this.passion.libelle,
              informations: this.passion.informations,
              date: this.passion.sinceWhen
            })
          }
          else{
            this.router.navigateByUrl('/home')
          }        
        }
    }
    else
      this.router.navigateByUrl('/home')
  }

  addExample(event: MatChipInputEvent): void{
    const example = event.value.trim()
    if(example !=''){
      this.examplesChips.push(example)
    }
    event.chipInput!.clear();
  }

  removeExample(example: string){
    const index = this.examplesChips.indexOf(example);
    if(index >= 0){
      this.examplesChips.splice(index, 1);
    }
  }

  addPassion(){
    if(this.passionForm.value.libelle != '' && this.passionForm.value.informations != '' && this.passionForm.value.date != ''){
      this.passion = {
        libelle: this.passionForm.value.libelle,
        informations: this.passionForm.value.informations,
        sinceWhen: (this.passionForm.value.date),
        examples: this.examplesChips
      }
      this.passionService.createPassion(this.userId, this.passion)
        .subscribe(
          resp => {
            const actualPassions = this.passionService._passions.getValue()
            actualPassions.push(resp)
            this.passionService._passions.next(actualPassions)
            this.router.navigateByUrl(`/users/${this.userId}`)
          }
        )
    }
    else{
      const dialogRef = this.dialog.open(ModalErrorComponent, {
        width: '350px',
        data: {
          message: 'Veuillez remplir tous les champs'
        }
        });
    }
  }

  updatePassion(){
    if(this.passionForm.value.libelle != '' && this.passionForm.value.informations != '' && this.passionForm.value.date != ''){
      this.passionService.updatePassion(
        this.userId,
        this.passionId,
        this.passionForm.value.libelle,
        this.passionForm.value.informations,
        this.passionForm.value.date,
        this.examplesChips
      ).subscribe(
        resp => {
          this.router.navigateByUrl(`/users/${this.userId}`)
        }
      )
    }
    else {
      const dialogRef = this.dialog.open(ModalErrorComponent, {
        width: '350px',
        data: {
          message: 'Veuillez remplir tous les champs'
        }
        });
    }
  }

  goBackToUser(){
    this.router.navigateByUrl(`/users/${this.userId}`)
  }

}