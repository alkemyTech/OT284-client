import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../../shared/interfaces/organization';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private url = 'https://ongapi.alkemy.org/api/organization';

  constructor( private http: HttpClient ) { }

  getOrganization(): Observable<Organization> {
    return this.http.get(this.url).pipe(
      map(
        (resp: any) => resp.data   
      )
    );
  }
}
