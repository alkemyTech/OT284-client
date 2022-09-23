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
    }
  ]
  constructor(public router: Router) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("UserData") || "{}");
    if (JSON.stringify(user) == "{}") {

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
        }
      ]
    } else {

      if (user.tipo == "admin") {
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
            text: 'Escritorio',
            link: 'backoffice',
            render: true
          }
        ]
      } else if (user.tipo == "usuario") {
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
            text: 'Contacto',
            link: 'contacto',
            render: true
          }
        ]
      }
    }
  }

}
