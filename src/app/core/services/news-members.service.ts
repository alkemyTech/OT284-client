import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsMembersService {
  url: string = environment.url + 'members'; //hasta crear variables de entorno correspondientes

  constructor(private httpService:HttpService) { }

  getMembers(searchQuery ?: string, skipQuery?: string, limitQuery?: string){
    return this.httpService.get(this.url);
  }

  postMembers(body: any){
    return this.httpService.post(this.url, body);
  }

  getMember(id: number){
    return this.httpService.get(this.url.concat(`/${id}`));
  }

  putMember(id:number, body: any){
    return this.httpService.put(this.url.concat(`/${id}`),body);
  }

  deleteMember(id: number){
    return this.httpService.delete(this.url.concat(`/${id}`));
  }
}
