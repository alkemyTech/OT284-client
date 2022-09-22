import { Component, DoCheck, Input, OnInit } from "@angular/core";
import { FormMapService } from "./form-map.service";

@Component({
  selector: "app-form-map",
  templateUrl: "./form-map.component.html",
  styleUrls: ["./form-map.component.scss"],
})
export class FormMapComponent implements OnInit {
  constructor(private formMap: FormMapService) {}
  lat: number;
  long: number;
  confirmedAddress = true;

  confirmingAdress() {
    this.formMap.confirmedAdress = true;
    console.log(this.formMap.confirmedAdress);
  }

  initMap(): void {
    const lat = this.lat;
    const long = this.long;

    const mapCoordinates = { lat: lat, lng: long };

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        mapId: "d674ebfc8ef08d67",
        center: mapCoordinates,
        zoom: 15,
      }
    );

    const marker = new google.maps.Marker({
      position: mapCoordinates,
      map: map,
    });
  }

  dataMap() {
    this.formMap.getCoordinates().subscribe((data: any) => {
      this.formMap.lat = data.results[0].position.lat;
      this.formMap.long = data.results[0].position.lon;
      this.lat = this.formMap.lat;
      this.long = this.formMap.long;
      this.initMap();
    });
  }

  ngOnInit(): void {
    this.dataMap();
  }
}
