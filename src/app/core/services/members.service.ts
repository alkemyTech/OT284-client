import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Member } from '../../shared/interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private url = 'https://ongapi.alkemy.org/api/members';

  constructor( private http: HttpClient ) { }

  getMembers(): Observable<Member[]> {
    return this.http.get(this.url).pipe(
      map(
        (resp: any) => resp.data
      )
    )
  }
}
