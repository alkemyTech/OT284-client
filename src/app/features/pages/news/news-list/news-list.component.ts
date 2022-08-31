import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { newData } from '../models/newM';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  public newsList:newData[]=[]
  public linkCrear:string='/backoffice/news/create';
  public linkReference: string='CREAR NOVEDAD'
  constructor(private srcNews:NewsService) { }

  displayedColumns: string[] = ['demo-image', 'demo-name', 'demo-date', 'demo-delete', 'demo-modify'];

  ngOnInit(): void {
    this.verNovedades();
  }

  public verNovedades():void{
    this.srcNews.verNews().subscribe({
      next:(Response:newData[])=>{
        //console.log(Response);
        this.newsList=Response;
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message)
      }
    })
  }

  public eliminar(id:number):void{

  }

  public modificar(id:number):void{

  }

}
