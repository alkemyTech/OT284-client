import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsHomeService } from 'src/app/core/services/news-home.service';
import { MatAlertDialogComponent } from 'src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loading: boolean = true;
  textoBienvenida: string = 'Texto de Bienvenida que despues sera consumido de una api';
  slides:any;
  novedades:any;
  constructor(private http: NewsHomeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSlides();
    this.getWelcomeMessage();
    this.getNovedades();
  }


  getSlides() { 
    this.loading = true;
    this.http.getSlides().subscribe((data: any) => {
      this.slides = data.data;
    },
      (error: any) => {
        this.notifyError("Error al obtener los datos de los slides");
      }).add(() => {
        this.loading = false;
      })
  }

  getWelcomeMessage() {
    this.loading = true;
    this.http.getMessageText().subscribe((data: any) => {
      this.textoBienvenida = data.data.long_description
    },
      (error: any) => {
        this.notifyError("Error al obtener los datos del mensaje de bienvenida");
      }).add(() => {
        this.loading = false;
      })
  }


  getNovedades() {
    this.loading = true;
    this.http.getNews().subscribe((data: any) => {
      this.novedades = data.data
    },
      (error: any) => {
        this.notifyError("Error al obtener los datos de las novedades");
      }).add(() => {
        this.loading = false;
      })
  }


  notifyError(message: string) {
    this.dialog
      .open(MatAlertDialogComponent, {
        data: {
          title: 'Ha ocurrido un error',
          message: `${message}. Intente de nuevo mas tarde`,
          confirmText: 'Aceptar'
        }
      })
  }


}
