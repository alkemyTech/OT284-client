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

  textoBienvenida: string = '';
  slides:any;
  novedades:any;
  constructor(private http: NewsHomeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSlides();
    this.getWelcomeMessage();
    this.getNovedades();
  }

  getSlides() { 
    this.http.getSlides().subscribe((data: any) => {
      console.log(data.data);
      this.slides = data.data;
    },
      (error: any) => {
        console.log(error);
        this.notifyError("Error al obtener los datos de los slides");
      })
  }

  getWelcomeMessage() {
    this.http.getMessageText().subscribe((data: any) => {
      console.log(data);
      this.textoBienvenida = data.data.long_description
    },
      (error: any) => {
        console.log(error);
        this.notifyError("Error al obtener los datos del mensaje de bienvenida");
      })
  }


  getNovedades() {
    this.http.getNews().subscribe((data: any) => {
      console.log(data.data);
      this.novedades = data.data
    },
      (error: any) => {
        console.log(error);
        this.notifyError("Error al obtener los datos de las novedades");
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
