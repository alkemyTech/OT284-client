import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-mat-alert-dialog",
  templateUrl: "./mat-alert-dialog.component.html",
  styleUrls: ["./mat-alert-dialog.component.scss"],
})
export class MatAlertDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<MatAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  closeDialog(): void {
    this.dialog.close(false);
  }
  confirm(): void {
    this.dialog.close(true);
  }
  ngOnInit(): void {}
}
