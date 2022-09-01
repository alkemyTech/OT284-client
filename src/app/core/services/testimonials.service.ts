import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Testimonial } from 'src/app/shared/interfaces/testimonial';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  constructor(private http: HttpService) { }

  getTestimonials() {
    return this.http.get<any>(environment.endpoints.testimonios.list);
  }

  postTestimonial(testimonio: Testimonial): Observable<any> {
    return this.http.post(environment.endpoints.testimonios.create, testimonio);
  }

  putTestimonial(id: number, testimonio: Testimonial) {
    return this.http.put(environment.endpoints.testimonios.edit+id, testimonio);
  }

}
