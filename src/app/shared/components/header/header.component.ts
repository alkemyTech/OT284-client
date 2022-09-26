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
      link: 'home',
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
    },
    {
      text: 'Actividades',
      link: 'actividades',
      render: true
    }

  ]
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.actualizarItems();
  }

  actualizarItems() {
    this.list = [{
      text: 'Inicio',
      link: 'home',
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
    },
    {
      text: 'Actividades',
      link: 'actividades',
      render: true
    }]

    let user = JSON.parse(localStorage.getItem("UserData") || "{}");
    if (JSON.stringify(user) == "{}") {
    } else {
      if (user.data.user.role_id == 1) {
        this.list = [
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
          },
          {
            text: 'Actividades',
            link: 'actividades',
            render: true
          },
          {
            text: 'Novedades',
            link: 'novedades',
            render: true
          },
          {
            text: 'Backoffice',
            link: 'backoffice',
            render: true
          }
        ]
      } else if (user.data.user.role_id == 2) {
        this.list = [
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
          },
          {
            text: 'Actividades',
            link: 'actividades',
            render: true
          },
          {
            text: 'Novedades',
            link: 'novedades',
            render: true
          }
        ]
      }
    }
  }





}
