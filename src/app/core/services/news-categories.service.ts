import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Category } from '../../shared/interfaces/category';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsCategoriesService {

  constructor( private http: HttpService ) { }

  createCategory( category: Category ) {
    return this.http.post(environment.endpoints.categories.create, category);
  }

  updateCategory( id: number, category: Category ) {
    return this.http.put(`${environment.endpoints.categories.edit}/${id}`, category);
  }

  getCategoryById( id: number ): Observable<Category> {
    return this.http.get(`${environment.endpoints.categories}/${id}`).pipe(
      map( (resp: any) => resp.data)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get(environment.endpoints.categories.list).pipe(
      map( (resp: any) => resp.data)
    );
  }

  deleteCategory( id: number ) {
    return this.http.delete(`${environment.endpoints.categories.delete}/${id}`);
  }

  searchCategory( query: string ): Observable<Category[]> {
    return this.http.get(`${environment.endpoints.categories.list}?search=${query}`).pipe(
      map( (resp: any) => resp.data)
    )
  }
}
