import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../../shared/interfaces/category';
import { Observable } from 'rxjs';
import { NewsCategoriesService } from '../../../../core/services/news-categories.service';
import { MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  dataSource$: Observable<Category[]>;
  displayedColumns: string[] = ['name', 'createdAt', 'edit', 'delete'];

  constructor( private router: Router, private categoryService: NewsCategoriesService ) { }

  ngOnInit(): void {
    this.dataSource$ = this.categoryService.getCategories();
  }

  onEdit(category: any) {
    this.router.navigateByUrl(`/backoffice/categorias/edit/${category.id}`);
  }

  onDelete(category: any) {
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
        this.categoryService.deleteCategory(category.id).subscribe(
          (resp: any) => {
            this.dataSource$ = this.categoryService.getCategories();
            this.table.renderRows();
            Swal.fire(
              'Eliminado',
              resp.message,
              'success'
            )
          }
        )
      }
    })
  }

}
