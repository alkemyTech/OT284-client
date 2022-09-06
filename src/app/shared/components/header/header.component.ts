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
      text: 'Actividades',
      link: 'actividades',
      render: true
    }, 
    {
      text: 'Nosotros',
      link: 'nosotros',
      render: false
    }, 
    {
      text: 'Contacto',
      link: 'contacto',
      render: true
    }]
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(item:any){
    this.router.navigateByUrl(item.link)
  }

}
