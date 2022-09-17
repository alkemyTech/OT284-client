import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { debounce, filter, map } from 'rxjs/operators';
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
  public newsList$:Observable<newData[]>;
  public search=new Subject<any>();
  public linkCrear:string='/backoffice/news/create';
  public linkReference: string='CREAR NOVEDAD';
  displayedColumns: string[] = ['demo-image', 'demo-name', 'demo-date', 'demo-delete', 'demo-modify'];
  
  constructor(private ruta:Router, public dialog: MatDialog, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.verNovedades();
  }

  public verNovedades():void{
    this.store.dispatch(loadNews());
    this.newsList$=this.store.select(selectNews);
  }

  public obtener(text:string):void{
    this.srcNews.buscarNews(text).subscribe({
      next:(Response:newData[])=>{
        this.newsList=Response
      },
      error:(error:HttpErrorResponse)=>{
        this.dialog.open(MatAlertErrorComponent,{
          data:{text:"Error al cargar novedades", message:error.message},
        })
      }
    })
  }

  public eliminar(news:newData):void{
    Swal.fire({
      title: `Esta seguro que quiere eliminar la novedad ${news.name}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.srcNews.deleteNew(news.id).subscribe({
          next:(Response:any)=>{
            //console.log(Response);
            Swal.fire('Deleted!', '', 'success')
          },
          error:(error:HttpErrorResponse)=>{
            this.dialog.open(MatAlertErrorComponent,{
              data:{text:"Error al eliminar novedad", message:error.message},
            })
          }
        })
      } else if (result.isDenied) {
        Swal.fire('The dish was not deleted', '', 'info')
      }
    })
    
  }

  public modificar(id:number):void{
    this.ruta.navigate([`backoffice/news/${id}`]);
  }

}
