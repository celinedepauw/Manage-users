import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Passion } from '../passion';
import { PassionService } from '../passion.service';
import {MatChipInputEvent} from '@angular/material/chips';

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
  examples!: string[];
  title!: string;
  addOnBlur = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passionService: PassionService
  ) { }

  ngOnInit(): void {
    this.examples = [];
    this.title = 'Création d\'une nouvelle passion';
    this.passions$ = this.passionService._passions.asObservable();
    this.passionForm = new FormGroup({
      libelle: new FormControl(''),
      informations: new FormControl(''),
      date: new FormControl(''),     
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
            console.log('valeur de date :', new Date(this.passion.sinceWhen))
            this.passionForm.patchValue({
              libelle: this.passion.libelle,
              informations: this.passion.informations,
              date: this.passion.sinceWhen,
              examples: this.passion.examples
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
    console.log('exemple saisi :', example)
    if(example !=''){
      this.examples.push(example)
    }
    console.log('tableau examples :', this.examples)
    event.chipInput!.clear();
  }

  removeExample(example: string){
    const index = this.examples.indexOf(example);
    if(index >= 0){
      this.examples.splice(index, 1);
    }
  }

  addPassion(){
    if(this.passionForm.value.libelle != '' && this.passionForm.value.informations != '' && this.passionForm.value.date != ''){
      this.passion = {
        libelle: this.passionForm.value.libelle,
        informations: this.passionForm.value.informations,
        sinceWhen: this.passionForm.value.date,
        examples: this.examples
      }
      console.log('passion envoyée : ', this.passion)
      this.passionService.createPassion(this.userId, this.passion)
        .subscribe(
          resp => {
            const actualPassions = this.passionService._passions.getValue()
            console.log('passions avant :', actualPassions)
            actualPassions.push(resp)
            this.passionService._passions.next(actualPassions)
            console.log('passions après :', actualPassions)
            console.log('reponse :', resp)
            this.router.navigateByUrl(`/users/${this.userId}`)
          }
        )
    }
  }

  updatePassion(){
    console.log('mise à jour de la passion')
  }

  goBackToUser(){
    this.router.navigateByUrl(`/users/${this.userId}`)
  }

}
