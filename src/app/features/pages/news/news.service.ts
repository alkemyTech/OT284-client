import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { newData, newM } from './models/newM';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private api='https://ongapi.alkemy.org/api/news';
  constructor(private http:HttpClient) { }

  public verNews():Observable<newData[]>{
    return this.http.get<newM>(this.api)
    .pipe(map((result)=>result.data));
  }

  public getNewModel(id:number):Observable<newData>{
    return this.http.get<any>(`${this.api}/${id}`)
    .pipe(map((result)=>result.data));
  }

  public deleteNew(id:number):Observable<any>{
    return this.http.delete<any>(`${this.api}/${id}`);
  }

}
