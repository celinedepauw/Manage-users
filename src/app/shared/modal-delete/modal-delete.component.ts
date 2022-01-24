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

/*    if(this.data.passionId){
      this.passionService.deletePassion(this.data.userId, this.data.passionId).subscribe(
        resp =>{
          this.dialogRef.close();
          this.passionService.getPassionsForUser(this.data.userId)
        .subscribe(
          resp2 => {this.passionService._passions.next(resp2)},
          error => {console.log('retour réponse erreur :', error)}
          )
        },
        error => {
          const dialogRef = this.dialog.open(ModalErrorComponent, {
            width: '350px'
          });
        }
      )
    }
    else {
      this.userService.deleteUser(this.data.userId)
      .subscribe(
        resp => {
        this.dialogRef.close();
        this.router.navigateByUrl('/home')
      },
      error => {
        const dialogRef = this.dialog.open(ModalErrorComponent, {
          width: '350px'
        });
      }
      )
    }  */
}
