import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { Slides } from "src/app/shared/interfaces/slides";

@Injectable({
  providedIn: "root",
})
export class NewsSlidesService {
  constructor(private http: HttpService) {}

  getSlide(): Observable<Slides> {
    return this.http.get(environment.url + "slides");
  }
  getSlideId(id: number): Observable<Slides> {
    return this.http.get(`${environment.url}slides/${id}`);
  }

  createSlide(body: any): Observable<Slides> {
    return this.http.post(environment.url + "slides", body);
  }

  editSlide(body: any, id: number): Observable<Slides> {
    return this.http.put(`${environment.url}slides/${id}`, body);
  }

  deleteSlide(id: number): Observable<Slides> {
    return this.http.delete(`${environment.url}slides/${id}`);
  }
}
