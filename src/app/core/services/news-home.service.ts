import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NewsHomeService {

  constructor(private http: HttpService) { }

  getSlides() {
    return this.http.get<any>(environment.url+'slides');
  }

  getMessageText() {
    return this.http.get<any>(environment.url+'organization');
  }

  getNews(){
    return this.http.get<any>(environment.url+'news?limit=8');
  }

}
