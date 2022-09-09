import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public list: any = [
    {
      text: 'Inicio',
      link: '',
      render: true
    },
    {
      text: 'Nosotros',
      link: 'nosotros',
      render: true
    },
    {
      text: 'Contacto',
      link: 'contacto',
      render: true
    }]
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
