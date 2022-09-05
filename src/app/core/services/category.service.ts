import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = 'https://ongapi.alkemy.org/api/categories';

  constructor( private http: HttpClient ) { }

  createCategory( category: Category ) {
    return this.http.post(this.url, category);
  }

  updateCategory( id: number, category: Category ) {
    return this.http.put(`${this.url}/${id}`, category);
  }

}
