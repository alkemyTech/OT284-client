import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { deletedNew, deleteNew, loadNews } from 'src/app/state/actions/news.action';
import { AppState } from 'src/app/state/app.state';
import { select, Store } from '@ngrx/store';
import { newData } from '../models/newM';
import { selectNews } from 'src/app/state/selectors/news.selector';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  public newsList$:Observable<newData[]>
  public linkCrear:string='/backoffice/news/create';
  public linkReference: string='CREAR NOVEDAD';
  displayedColumns: string[] = ['demo-image', 'demo-name', 'demo-date', 'demo-delete', 'demo-modify'];
  
  constructor(private ruta:Router, public dialog: MatDialog, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadNews());
    this.newsList$=this.store.select(selectNews);
  }

  public eliminar(newToDelete:newData){
      Swal.fire({
      title: `Esta seguro que quiere eliminar la novedad ${newToDelete.name}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(deleteNew({newToDelete}));
        this.newsList$=this.store.select(selectNews);
      } else if (result.isDenied) {
        Swal.fire('The dish was not deleted', '', 'info')
      }
    })
    
  }

  public modificar(id:number):void{
    this.ruta.navigate([`backoffice/news/${id}`]);
  }

}
