import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatAlertErrorComponent } from 'src/app/shared/components/mat-alert-error/mat-alert-error.component';
import { newData } from '../models/newM';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-cards',
  templateUrl: './news-cards.component.html',
  styleUrls: ['./news-cards.component.scss']
})
export class NewsCardsComponent implements OnInit {
  public newsLista: newData[]=[]
  public newModel!:newData;
  public myTitle:string;
  public anotherTitle:string;
  constructor(private newsService: NewsService, private ruta:Router, public dialog: MatDialog) {
    this.myTitle="Novedades";
    this.anotherTitle="Ultimo evento";
  }

  ngOnInit(): void {
    this.verNovedades();
  }

  public verNovedades():void{
    this.newsService.verNews().subscribe({
      next:(Response:newData[])=>{
        this.newsLista=Response;
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
