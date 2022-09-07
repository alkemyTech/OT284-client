import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NewsCategoriesService {

  private url = 'https://ongapi.alkemy.org/api/categories';

  constructor( private http: HttpService ) { }

  createCategory( category: Category ) {
    return this.http.post(this.url, category);
  }

  updateCategory( id: number, category: Category ) {
    return this.http.put(`${this.url}/${id}`, category);
  }

  getCategoryById( id: number ): Observable<Category> {
    return this.http.get(`${this.url}/${id}`).pipe(
      map( (resp: any) => resp.data)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get(this.url).pipe(
      map( (resp: any) => resp.data)
    );
  }

  deleteCategory( id: number ) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
