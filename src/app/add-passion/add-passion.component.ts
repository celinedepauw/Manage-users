import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Passion } from '../passion';
import { PassionService } from '../passion.service';

@Component({
  selector: 'app-add-passion',
  templateUrl: './add-passion.component.html',
  styleUrls: ['./add-passion.component.scss']
})
export class AddPassionComponent implements OnInit {

  passion!: Passion;
  passions$!: Observable<Passion[]>;
  userId!: string;
  passionForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passionService: PassionService
  ) { }

  ngOnInit(): void {

    this.passions$ = this.passionService._passions.asObservable();

    this.passionForm = new FormGroup({
      libelle: new FormControl(''),
      informations: new FormControl(''),
      date: new FormControl(''),
      examples: new FormControl('')
    });
    const routeParams = this.route.snapshot.paramMap;
    if(this.userId !='')
      this.userId = routeParams.get('idUser')!
    else
      this.router.navigateByUrl('/home')

  }

  addPassion(){
    if(this.passionForm.value.libelle != '' && this.passionForm.value.informations != '' && this.passionForm.value.date != ''){
      this.passion = {
        libelle: this.passionForm.value.libelle,
        informations: this.passionForm.value.informations,
        sinceWhen: this.passionForm.value.date,
        examples: this.passionForm.value.examples
      }
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

  goBackToUser(){
    this.router.navigateByUrl(`/users/${this.userId}`)
  }

}
