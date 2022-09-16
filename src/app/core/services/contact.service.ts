import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpServ: HttpService) { }

  sendMessage(body:any): Observable<any> {
    return this.httpServ.post(environment.endpoints.contactos.create , body).pipe(
      map(
        (resp: any) => resp.message   
      )
    );
  }

  deleteContact(id:number): Observable<any> {
    return this.httpServ.delete(environment.endpoints.contactos.delete(id)).pipe(
      map(
        (resp: any) => resp.message   
      )
    );
  }

  editContact(id:number, body:any): Observable<any> {
    return this.httpServ.put(environment.endpoints.contactos.edit(id), body).pipe(
      map(
        (resp: any) => resp
      )
    );
  }

  listContact(): Observable<any> {
    return this.httpServ.get(environment.endpoints.contactos.list).pipe(
      map(
        (resp: any) => resp
      )
    );
  }

}
