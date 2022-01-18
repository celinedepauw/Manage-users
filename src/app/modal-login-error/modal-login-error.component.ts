import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-login-error',
  templateUrl: './modal-login-error.component.html',
  styleUrls: ['./modal-login-error.component.scss']
})
export class ModalLoginErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalLoginErrorComponent>,
  ) { }

  ngOnInit(): void {
  }

  retryConnect(){
    this.dialogRef.close()
  }
}
