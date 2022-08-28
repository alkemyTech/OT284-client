import { Component, OnInit } from '@angular/core';
import { NewsHomeService } from 'src/app/core/services/news-home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  textoBienvenida: string = 'Texto de Bienvenida que despues sera consumido de una api';
  constructor(private http: NewsHomeService) { }

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
        //msg error
      }
    })
  }

  getWelcomeMessage() {
    this.http.getMessageText().subscribe((data: any) => {
      console.log(data);

      if (data.success) {
        this.textoBienvenida = data.data.long_description
      }
      else {
        //msg error
      }
    })
  }


  getNovedades(){
    this.http.getNews().subscribe((data: any) => {
      if (data.success) {
        console.log(data.data);
      }
      else {
        //msg error
      }
    })
  }

}
