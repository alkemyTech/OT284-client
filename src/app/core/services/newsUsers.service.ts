import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "src/app/core/services/http.service";

@Injectable({
  providedIn: "root",
})
export class NewsUsersService {
  constructor(private httpServ: HttpService, private http: HttpClient) {}

  public get(url: string) {
    return this.httpServ.get(`${url}users`);
  }

  public getSearch(
    url: string,
    querySearch: string,
    queryRole: number
  ): Observable<any> {
    return this.http.get(`${url}users?search=${querySearch}&role=${queryRole}`);
  }

  public getID(url: string, id: number): Observable<any> {
    return this.http.get(`${url}users/${id}`);
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  public put(url: string, id: number, body: any): Observable<any> {
    return this.http.put(`${url}/${id}`, body);
  }

  public delete(url: string, id: number): Observable<any> {
    return this.http.delete(`${url}users/${id}`);
  }
}
