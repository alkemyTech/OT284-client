import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { newData, newM, Novedad } from './models/newM';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private api='https://ongapi.alkemy.org/api/news';
  public novedad!:newData;
  constructor(private http:HttpClient) { }

  public verNews():Observable<newData[]>{
    return this.http.get<newM>(this.api)
    .pipe(map((result)=>result.data));
  }

  public getNewModel(id:number):Observable<newData>{
    return this.http.get<any>(`${this.api}/${id}`)
    .pipe(map((result)=>result.data));
  }

  public nuevaNew(novedad:Novedad):Observable<Novedad>{
    return this.http.post<Novedad>(this.api,novedad);
  } 

  public modificarNew(novedad:Novedad):Observable<Novedad>{
    return this.http.put<Novedad>(`${this.api}/${novedad.id}`,novedad);
  } 

}
