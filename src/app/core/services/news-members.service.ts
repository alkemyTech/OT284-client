import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsMembersService {

  constructor(private httpService:HttpService) { }

  getMembers(searchQuery : string, skipQuery?: string, limitQuery?: string){
    if(searchQuery?.length >1){
      return this.httpService.get(environment.endpoints.miembros.list+ `/?search=${searchQuery}`);
    }
    else{
      return this.httpService.get(environment.endpoints.miembros.list);
    }
    
  }

  postMembers(body: any){
    return this.httpService.post(environment.endpoints.miembros.create, body);
  }

  getMember(id: number){
    return this.httpService.get(environment.endpoints.miembros.getMiembro(id));
  }

  putMember(id:number, body: any){
    return this.httpService.put(environment.endpoints.miembros.edit(id),body);
  }

  deleteMember(id: number){
    return this.httpService.delete(environment.endpoints.miembros.delete(id));
  }
}
