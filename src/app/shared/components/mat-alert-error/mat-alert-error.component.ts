import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-mat-alert-error',
  templateUrl: './mat-alert-error.component.html',
  styleUrls: ['./mat-alert-error.component.scss']
})
export class MatAlertErrorComponent implements OnInit {

  constructor(public dialog: MatDialogRef<MatAlertErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialog.close();
  }

}
