import { Injectable } from "@angular/core";
import { Organization } from "../../shared/interfaces/organization";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Member } from "../../shared/interfaces/member";
import { environment } from "src/environments/environment";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class AboutService {
  constructor(private http: HttpService) {}

  getOrganization(): Observable<Organization> {
    return this.http
      .get(environment.endpoints.organization.list)
      .pipe(map((resp: any) => resp.data));
  }

  postOrganization(body: any): Observable<Organization> {
    return this.http
      .post(environment.endpoints.organization.create, body)
      .pipe(map((resp: any) => resp.data));
  }

  putOrganization(id: number, body: any): Observable<Organization> {
    return this.http.put(environment.endpoints.organization.edit + id, body);
  }

  getMembers(): Observable<Member[]> {
    return this.http
      .get(`${environment.url}members`)
      .pipe(map((resp: any) => resp.data));
  }
}
