import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { debounce, filter, map } from 'rxjs/operators';
import { deleteNew, loadNews, searchNew } from 'src/app/state/actions/news.action';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
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
    this.search.pipe(
      map((event:any)=>event.target.value),
      filter(text => text.length > 2),
      debounce(()=>interval(500)),
    ).subscribe({
      next:(text)=>{
        this.obtener(text);
      }
    })
    this.search.pipe(
      map((event:any)=>event.target.value),
      filter(text=>text.length<=2)
    ).subscribe({
      next:()=>{
        this.verNovedades()
      }
    })
  }

  public verNovedades():void{
    this.store.dispatch(loadNews());
    this.newsList$=this.store.select(selectNews);
  }

  public obtener(text:string):void{
    this.store.dispatch(searchNew({text}));
    this.newsList$=this.store.select(selectNews);
  }

  public eliminar(newToDelete:newData):void{
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
        Swal.fire('La novedad no fue eliminada', '', 'info')
      }
    })
    
  }

  public modificar(id:number):void{
    this.ruta.navigate([`backoffice/news/${id}`]);
  }

}
