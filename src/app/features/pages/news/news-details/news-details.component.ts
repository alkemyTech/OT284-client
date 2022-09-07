import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatAlertErrorComponent } from 'src/app/shared/components/mat-alert-error/mat-alert-error.component';
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
  public isLoading:boolean;
  constructor(private svc:NewsService, private ruta:ActivatedRoute, public dialog:MatDialog) {
    this.id=this.getId();
    this.isLoading=true;
   }

  ngOnInit(): void {
    this.verNovedad(this.id);
  }

  public verNovedad(id:number){
    this.svc.getNewModel(id).subscribe({
      next:(data:newData)=>{
        this.myTitle=data.name;
        this.srcImg=data.image;
        this.isLoading=false;
        this.content=data.content;
      },
      error:(error:HttpErrorResponse)=>{
        this.dialog.open(MatAlertErrorComponent,{
          data:{text:"Error al cargar novedad", message:error.message},
        })
      }
    })
  }

  public getId():number{
    return this.ruta.snapshot.params['id'];
  }
}
