import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  public linkReference: string='CREAR NOVEDAD';
  displayedColumns: string[] = ['demo-image', 'demo-name', 'demo-date', 'demo-delete', 'demo-modify'];
  
  constructor(private srcNews:NewsService, private ruta:Router) { }

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
            console.log(error.message);
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