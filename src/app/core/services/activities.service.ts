import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from 'src/app/shared/interfaces/activity';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private httpServ: HttpService) { }

  getActivities(): Observable<Activity[]> {
    return this.httpServ.get<Activity[]>(environment.endpoints.actividades.list).pipe(
      map(
        (resp: any) => resp.data
      )
    );;
  }

  getActivity(id: number) {
    return this.httpServ.get<any>(environment.endpoints.actividades.getById);
  }

  postActivity(actividad: Activity): Observable<any> {
    return this.httpServ.post(environment.endpoints.actividades.create, actividad);
  }

  putActivity(id: number, actividad: Activity) {
    return this.httpServ.put(environment.endpoints.actividades.edit, actividad);
  }

  deleteActivity(id: number): Observable<any> {
    return this.httpServ.delete(environment.endpoints.actividades.delete);
  }
}
