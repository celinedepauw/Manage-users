import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-error-form',
  templateUrl: './modal-error-form.component.html',
  styleUrls: ['./modal-error-form.component.scss']
})
export class ModalErrorFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalErrorFormComponent>
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close()
  }
}
