import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../../shared/interfaces/organization';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Member } from '../../shared/interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private url = 'https://ongapi.alkemy.org/api';

  constructor( private http: HttpClient ) { }

  getOrganization(): Observable<Organization> {
    return this.http.get(`${this.url}/organization`).pipe(
      map(
        (resp: any) => resp.data   
      )
    );
  }

  getMembers(): Observable<Member[]> {
    return this.http.get(`${this.url}/members`).pipe(
      map(
        (resp: any) => resp.data
      )
    )
  }
}
