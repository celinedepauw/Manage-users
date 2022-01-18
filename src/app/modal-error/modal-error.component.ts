import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalErrorComponent>,
  ) { }

  ngOnInit(): void {
  }

  retry(){
    this.dialogRef.close()
  }
}
