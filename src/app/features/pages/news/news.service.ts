import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { newData, newM } from './models/newM';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http:HttpClient) { }

  public verNews():Observable<newData[]>{
    return this.http.get<newM>(environment.endpoints.novedades.list)
    .pipe(map((result)=>result.data));
  }

  public getNewModel(id:number):Observable<newData>{
    return this.http.get<any>(environment.endpoints.novedades.detail(id))
    .pipe(map((result)=>result.data));
  }

}
