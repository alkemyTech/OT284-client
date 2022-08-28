import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LinkComponent } from "./components/link/link.component";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { TitleComponent } from "./components/title/title.component";
import { MatAlertDialogComponent } from './components/mat-alert-dialog/mat-alert-dialog.component';
import { PhonePipe } from './helpers/phonePipe';
import { MatAlertErrorComponent } from './components/mat-alert-error/mat-alert-error.component';
@NgModule({
  declarations: [LinkComponent, TitleComponent,
    PhonePipe, MatAlertDialogComponent, MatAlertErrorComponent],
  imports: [CommonModule, RouterModule, MatButtonModule],
  exports: [
    LinkComponent,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    TitleComponent,
    PhonePipe
  ],
})
export class SharedModule {}
