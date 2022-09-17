import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../../shared/interfaces/category';
import { fromEvent, Observable } from 'rxjs';
import { MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { selectCategories, selectLoading, selectCategoriesResult } from '../../../../state/selectors/categories.selectors';
import { loadCategories, deleteCategory, searchCategory } from '../../../../state/actions/categories.actions';
import { filter, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  @ViewChild(MatTable) table: MatTable<any>;

  isLoading: boolean;
  dataSource$: Observable<Category[]>;
  displayedColumns: string[] = ['name', 'createdAt', 'edit', 'delete'];

  constructor( private router: Router, private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.store.dispatch(loadCategories());
    this.dataSource$ = this.store.select(selectCategories);

    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((query: string) => {
      if (query.length > 2) {
        this.store.dispatch(searchCategory({query}));
        this.dataSource$ = this.store.select(selectCategoriesResult);
      } else {
        this.dataSource$ = this.store.select(selectCategories);
      }
    })
    
    this.store.select(selectLoading).subscribe(
      loading => this.isLoading = loading
    );
  }

  onEdit(category: Category) {
    this.router.navigateByUrl(`/backoffice/categorias/edit/${category.id}`);
  }

  onDelete(category: Category) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Eliminar ${category.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (category.id) {
          this.store.dispatch(deleteCategory({id: category.id}));
          this.table.renderRows();
          Swal.fire(
            'Eliminado',
            'Categoría eliminada correctamente',
            'success'
          )
        }
      }
    })
  }

}
