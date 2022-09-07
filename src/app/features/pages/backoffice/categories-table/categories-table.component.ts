import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../shared/interfaces/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'createdAt', 'edit', 'delete'];
  dataSource$: Observable<Category[]>;

  constructor( private router: Router, private categoryService: CategoryService ) { }

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
