import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Passion } from '../passion';
import { PassionService } from '../passion.service';

@Component({
  selector: 'app-add-passion',
  templateUrl: './add-passion.component.html',
  styleUrls: ['./add-passion.component.scss']
})
export class AddPassionComponent implements OnInit {

  passion!: Passion;
  passionForm!: FormGroup;

  constructor(
    private passionService: PassionService
  ) { }

  ngOnInit(): void {
    this.passionForm = new FormGroup({
      libelle: new FormControl(''),
      informations: new FormControl(''),
      date: new FormControl(''),
      examples: new FormControl('')
    })
  }

  createPassion(){
    if(this.passionForm.value.libelle != '' && this.passionForm.value.informations != '' && this.passionForm.value.date != ''){
      this.passion = {
        libelle: this.passionForm.value.libelle,
        informations: this.passionForm.value.informations,
        sinceWhen: this.passionForm.value.date,
        examples: this.passionForm.value.examples
      }
      this.passionService.createPassion(localStorage.getItem('user_id')!, this.passion)
        .subscribe(resp => console.log(resp))
    }
    
  }

}
