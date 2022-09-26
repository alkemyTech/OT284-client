import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { debounce, filter, map } from 'rxjs/operators';
import { NewsCategoriesService } from 'src/app/core/services/news-categories.service';
import { deleteNew, loadNews, searchNew } from 'src/app/state/actions/news.action';
import { AppState } from 'src/app/state/app.state';
import { Category } from 'src/app/shared/interfaces/category';
import { Store } from '@ngrx/store';
import { newData } from '../models/newM';
import { selectNews } from 'src/app/state/selectors/news.selector';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NewsService } from '../news.service';
import { loadCategories } from 'src/app/state/actions/categories.actions';
import { selectCategories } from 'src/app/state/selectors/categories.selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAlertErrorComponent } from 'src/app/shared/components/mat-alert-error/mat-alert-error.component';

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
  displayedColumns: string[] = ['demo-image', 'demo-name', 'demo-date', 'demo-actions'];
  
  constructor(private store:Store<AppState>, private srcNews:NewsService, private ruta:Router, public dialog: MatDialog, private srcCategory:NewsCategoriesService) { }

  categoriesList:string[]=['Todas'];
  categoryName:string='';
  buscador:string='';
  selectedCategory:string;

  public getCategories(){
    let categorias:Category[];
    this.srcCategory.getCategories().subscribe(cat=>{
      categorias=cat;
      categorias.forEach(cat=>{
        this.categoriesList.push(cat.name);
      })
    })
  }

  public searchCat(event:any){
    if(event.source.value && event.source.selected){
      this.categoryName=event.source.value;
    }
    //Busca por categoria y texto
    if(this.buscador!='' && this.categoryName!='Todas'){
      this.srcNews.buscarNewsWithCateg(this.buscador,this.categoryName).subscribe(resp=>{
        this.newsList$=resp;
      })
    }
    //Busca por texto solo
    else if(this.categoryName=='Todas' && this.buscador!=''){
      this.obtener();
    }
    //Trae todas las novedades:
    else if(this.buscador=='' && this.categoryName=='Todas'){
      this.newsList$=this.store.select(selectNews);
    }
    //Busca por categoria solamente
    else if(this.buscador=='' && this.categoryName!=''){
      this.newsList$=this.srcNews.buscarNewsByCatOnly(this.categoryName);
    }
  }

  ngOnInit(): void {
    this.verNovedades();
    this.getCategories();
    this.search.pipe(
      map((event:any)=>event.target.value),
      filter(text => text.length > 2),
      debounce(()=>interval(500)),
    ).subscribe({
      next:(text)=>{
        this.buscador=text;
        this.obtener();
      }
    })
    this.search.pipe(
      map((event:any)=>event.target.value),
      filter(text=>text.length<=2)
    ).subscribe({
      next:()=>{
        this.buscador='';
        this.obtener();
      }
    })
  }

  public verNovedades():void{
    //Hago el llamado al servicio directamente
      this.srcNews.verNews().subscribe({
        next: (Response) => {
          this.newsList$ = Response;
        },
        error: (error: HttpErrorResponse) => {
          this.dialog.open(MatAlertErrorComponent, {
            data: {text: "Error al buscar novedades", message: error.message},
          });
        },
    });
    //Hago la acción por el store para que queden cargados, sin el select:
    this.store.dispatch(loadNews());
  }


  public obtener():void{
    //Busca solo por texto
    if(this.buscador!=''){
      if(this.categoryName=='Todas' || this.categoryName==''){
        this.newsList$=this.srcNews.buscarNews(this.buscador);
        //this.store.dispatch(searchNew({text}));
        //this.newsList$=this.store.select(selectNews);
      }
      //Busca por texto y categoria
      else if(this.categoryName!='Todas'){
        this.newsList$=this.srcNews.buscarNewsWithCateg(this.buscador,this.categoryName)
      }
    }else if(this.buscador==''){
      //Trae todas las novedades
      if(this.categoryName=='Todas' || this.categoryName==''){
        console.log('todo')
        this.newsList$=this.store.select(selectNews);
      }
      //Busca por categoria solamente
      else if(this.categoryName!='Todas'){
        this.newsList$=this.srcNews.buscarNewsByCatOnly(this.categoryName);
      }
    };
  }

  public eliminar(newToDelete:newData):void{
    Swal.fire({
      title: `Esta seguro que quiere eliminar la novedad ${newToDelete.name}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
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
