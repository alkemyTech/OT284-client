import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { Member } from '../../shared/interfaces/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsMembersService {

  constructor(private httpService:HttpService) { }

  getMembers(searchQuery : string, skipQuery?: string, limitQuery?: string){
    if(searchQuery.search.length >1){
      return this.httpService.get(environment.endpoints.miembros.list+ `?search=${searchQuery.search}`);
    }
    else{
      return this.httpService.get(environment.endpoints.miembros.list);
    }
    
  }

  postMembers(member: Member){
    return this.httpService.post(environment.endpoints.miembros.create, member);
  }

  getMember(id: number): Observable<Member> {
    return this.httpService.get(environment.endpoints.miembros.getMiembro(id)).pipe(
      map( (resp: any) => resp.data)
    );
  }

  putMember(id:number, member: Member){
    return this.httpService.put(environment.endpoints.miembros.edit(id),member);
  }

  deleteMember(id: number){
    return this.httpService.delete(environment.endpoints.miembros.delete(id));
  }
}
