import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map-window',
  templateUrl: './map-window.component.html',
  styleUrls: ['./map-window.component.scss']
})
export class MapWindowComponent implements OnInit {
/* 
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  }; */

  constructor() { }

  ngOnInit(): void {
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 10,
      attribution: '© OpenStreetMap'
  }).addTo(map);
  }

}
