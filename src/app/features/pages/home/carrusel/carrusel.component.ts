import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent implements OnInit {

  @Input() listSlider: Array<any> = [
    { image: 'https://www.wallpaperuse.com/wallp/85-855565_m.jpg', title: 'Messi', description: 'El mejor jugador del mundo' },
    { image: 'https://www.wallpaperuse.com/wallp/85-855565_m.jpg', title: 'Messi', description: 'El mejor jugador del mundo' },
    { image: 'https://www.wallpaperuse.com/wallp/85-855565_m.jpg', title: 'Messi', description: 'El mejor jugador del mundo' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
