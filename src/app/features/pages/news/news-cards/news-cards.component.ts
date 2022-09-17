import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interval, Observable, Subject } from 'rxjs';
import { debounce, filter, map } from 'rxjs/operators';
import { MatAlertErrorComponent } from 'src/app/shared/components/mat-alert-error/mat-alert-error.component';
import { newData } from '../models/newM';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-cards',
  templateUrl: './news-cards.component.html',
  styleUrls: ['./news-cards.component.scss']
})
export class NewsCardsComponent implements OnInit {
  public newsList:newData[]
  public search=new Subject<any>();
  public newModel!:newData;
  public myTitle:string;
  public anotherTitle:string;
  constructor(private newsService: NewsService, private ruta:Router, public dialog: MatDialog) {
    this.myTitle="Novedades";
    this.anotherTitle="Ultimo evento";
  }

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

  public verNovedades(){
    this.newsService.verNews().subscribe({
      next:(Response:newData[])=>{
        this.newsList=Response
      },
      error:(error:HttpErrorResponse)=>{
        this.dialog.open(MatAlertErrorComponent,{
          data:{text:"Error al buscar novedades", message:error.message},
        })
      }
    })
  }

  public obtener(text:string):void{
    this.newsService.buscarNews(text).subscribe({
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

  public mostrarFechaAct(fechaCreacion:string,fechaAct:string){
    let result=false;
    let creationDate=Date.parse(fechaCreacion);
    let uploadedDate=Date.parse(fechaAct);
    //console.log("CReacion:"+fechaCreacion+". Actualiz:"+fechaAct);
    if(creationDate<uploadedDate){
      result=true;
    }
    return result;
  }
  
  public detalleVer(novedad:newData){
    this.ruta.navigate([`novedades/${novedad.id}`]);
  }

}
