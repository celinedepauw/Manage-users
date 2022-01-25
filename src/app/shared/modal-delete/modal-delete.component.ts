import { Component, EventEmitter, Inject, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDeleteComponent implements OnInit {

  @Output() confirmEmitter = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, typeOfModal: string, userId: string, passionId?: string},
  ) { }

  ngOnInit(): void {
  }
}
