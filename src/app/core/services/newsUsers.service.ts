import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "src/app/core/services/http.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NewsUsersService {
  constructor(private httpServ: HttpService, private http: HttpClient) {}

  public get() {
    return this.httpServ.get(`${environment.url}users`);
  }

  public getSearch(querySearch: string, queryRole: number): Observable<any> {
    return this.http.get(
      `${environment.url}users?search=${querySearch}&role=${queryRole}`
    );
  }

  public getID(id: number): Observable<any> {
    return this.http.get(`${environment.url}users/${id}`);
  }

  public post(body: any): Observable<any> {
    return this.http.post(`${environment.url}users`, body);
  }

  public put(id: number, body: any): Observable<any> {
    return this.http.put(`${environment.url}users/${id}`, body);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.url}users/${id}`);
  }
}
