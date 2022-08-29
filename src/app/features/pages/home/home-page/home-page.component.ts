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

  textoBienvenida: string = 'Texto de Bienvenida que despues sera consumido de una api';
  constructor(private http: NewsHomeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSlides();
    this.getWelcomeMessage();
    this.getNovedades();
  }

  getSlides() {
    this.http.getSlides().subscribe((data: any) => {
      if (data.success) {
        console.log(data.data);
      }
      else {
        this.notifyError("los slides");
      }
    })
  }

  getWelcomeMessage() {
    this.http.getMessageText().subscribe((data: any) => {
      if (data.success) {
        console.log(data);
        this.textoBienvenida = data.data.long_description
      }
      else {
        this.notifyError("texto de bienvenida");
      }
    })
  }


  getNovedades() {
    this.http.getNews().subscribe((data: any) => {
      if (data.success) {
        console.log(data.data);
      }
      else {
        this.notifyError("novedades");
      }
    })
  }


  notifyError(message: string) {
    this.dialog
      .open(MatAlertDialogComponent, {
        data: {
          title: 'Error',
          message: `Hubo un error al obtener la informacion de ${message}. Intente de nuevo mas tarde`,
          confirmText: 'Aceptar'
        }
      })
  }


}
