import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  textoBienvenida: string = 'Texto de Bienvenida que despues sera consumido de una api';
  constructor() { }

  ngOnInit(): void {
  }

}
