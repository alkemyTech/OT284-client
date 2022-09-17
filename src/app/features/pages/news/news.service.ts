import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { newData, newM, Novedad } from './models/newM';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public novedad!:newData;
  constructor(private ruta: Router, private httpServ:HttpService) { }


  public verNews():Observable<newData[]>{
    return this.httpServ.get<newM>(environment.endpoints.novedades.list, false)
    .pipe(map((result)=>result.data));
  }

  public getNewModel(id:number):Observable<newData>{
    return this.httpServ.get<any>(environment.endpoints.novedades.detail(id))
    .pipe(map((result)=>result.data));
  }

  public deleteNew(id:number):Observable<any>{
    return this.httpServ.delete<any>(environment.endpoints.novedades.delete(id));
  }
  
  public nuevaNew(novedad:Novedad):Observable<Novedad>{
    return this.httpServ.post<Novedad>(environment.endpoints.novedades.create,novedad);
  } 

  public modificarNew(novedad:Novedad):Observable<Novedad>{
    return this.httpServ.put<Novedad>(environment.endpoints.novedades.edit(novedad.id),novedad);
  } 

  public redireccionar():void{
    this.ruta.navigate(['/novedades']);
  }

  public buscarNews(text:string):Observable<any>{
    return this.httpServ.get<any>(`${environment.endpoints.novedades.list}?search=${text}`)
    .pipe(
      map(result=>result.data)
    )
  }


}
