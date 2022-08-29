import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(private svc:NewsService) {
    this.myTitle="";
    this.id=this.svc.getId();
   }

  ngOnInit(): void {
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

}
