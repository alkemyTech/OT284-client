import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private httpServ: HttpService) { }

  getActivities() {
    return this.httpServ.get<any>(environment.endpoints.actividades.list);
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
