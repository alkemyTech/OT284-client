import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendMessage(body:any): Observable<any> {
    return this.http.post(environment.url + "contacts", body).pipe(
      map(
        (resp: any) => resp.message   
      )
    );
  }

}
