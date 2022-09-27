import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public list: any = []
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
    if (JSON.stringify(user) != "{}") {
      if (user.data?.user?.role_id == 1) {
        this.list.push(
          {
            text: 'Novedades',
            link: 'novedades',
            render: true
          },
          {
            text: 'Backoffice',
            link: 'backoffice',
            render: true
          });
      } else {
        this.list.push(
          {
            text: 'Novedades',
            link: 'novedades',
            render: true
          });
      }
    }

  }





}
