import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormMapService {
  constructor(private http: HttpClient) {}
  mapAddress: string;
  lat: number;
  long: number;
  confirmedAdress = false;

  getCoordinates() {
    return this.http.get(
      `https://api.tomtom.com/search/2/geocode/${this.mapAddress}.json?key=Xmq8mPpIxsl9l5W5vsEc5wVN95UlvStx&countrySet=AR`
    );
  }
}
