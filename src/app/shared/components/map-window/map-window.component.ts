import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { FormMapService } from 'src/app/features/pages/backoffice/users/form-create-user/form-map/form-map.service';

@Component({
  selector: 'app-map-window',
  templateUrl: './map-window.component.html',
  styleUrls: ['./map-window.component.scss']
})
export class MapWindowComponent implements OnInit {

  lat: number;
  long:number;
  @Input() address: string;

 
  constructor(private formMap: FormMapService, public dialog: MatDialog) { }

  async ngOnInit(){
    this.formMap.mapAddress = this.address
    this.formMap.getCoordinates().subscribe(
      (data: any) => {
        this.lat =data.results[0].position.lat;
        this.long = data.results[0].position.lon;
        var map = L.map('map').setView([this.lat, this.long], 17);
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '© OpenStreetMap'
          }).addTo(map);
            this.addMarker(this.lat, this.long , map)
          },
      (error: any) => {
        this.dialog.open(MatAlertErrorComponent , {
          data: {text:`error al cargar el mapa `, message: error},
        })
      }
    )
  }

  addMarker(lat:number, long:number, map: L.Map){
    var myIcon = L.icon({
      iconUrl: 'http://ongapi.alkemy.org/storage/oqhHt6tOMb.png',
      iconSize: [38, 60],
      });
    var marker = L.marker([lat, long], {icon: myIcon}).addTo(map)
		.bindPopup('<b>Hello everybody!</b><br />Here is our ONG.').openPopup();
  }

}
