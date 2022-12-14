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
import { FooterComponent } from "./components/footer/footer.component";
import { TitleComponent } from "./components/title/title.component";
import { MatAlertDialogComponent } from "./components/mat-alert-dialog/mat-alert-dialog.component";
import { AuthButtonsComponent } from "./components/auth-buttons/auth-buttons.component";
import { PhonePipe } from "./helpers/phonePipe";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatAlertErrorComponent } from "./components/mat-alert-error/mat-alert-error.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { MapWindowComponent } from "./components/map-window/map-window.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { HeaderComponent } from './components/header/header.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { CardComponent } from "./components/card/card.component";


@NgModule({
  declarations: [
    LinkComponent,
    TitleComponent,
    CardComponent,
    PhonePipe,
    MatAlertDialogComponent,
    AuthButtonsComponent,
    MatAlertErrorComponent,
    SpinnerComponent, 
    MapWindowComponent,
    FooterComponent,
    HeaderComponent,
    SkeletonComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, LeafletModule],
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
    PhonePipe,
    AuthButtonsComponent,
    MapWindowComponent,
    MatCheckboxModule,
    SpinnerComponent,
    HeaderComponent,
    SkeletonComponent,
    CardComponent,
    FooterComponent
  ],
})
export class SharedModule {}
