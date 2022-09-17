import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../../shared/interfaces/category';
import { Observable } from 'rxjs';
import { MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { selectCategories } from '../../../../state/selectors/categories.selectors';
import { loadCategories, deleteCategory } from '../../../../state/actions/categories.actions';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  dataSource$: Observable<Category[]>;
  displayedColumns: string[] = ['name', 'createdAt', 'edit', 'delete'];

  constructor( private router: Router, private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.dataSource$ = this.store.select(selectCategories);
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
