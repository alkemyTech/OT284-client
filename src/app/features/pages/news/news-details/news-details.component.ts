import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { newData } from '../models/newM';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  public myTitle:string;
  public id:number;
  public srcImg:string;
  public content:string;
  constructor(private svc:NewsService, private ruta:ActivatedRoute) {
    this.id=this.getId();
   }

  ngOnInit(): void {
    this.verNovedad(this.id);
  }

  public verNovedad(id:number){
    this.svc.getNewModel(id).subscribe({
      next:(data:newData)=>{
        this.myTitle=data.name;
        this.srcImg=data.image;
        this.content=data.content;
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public getId():number{
    return this.ruta.snapshot.params['id'];
  }
}