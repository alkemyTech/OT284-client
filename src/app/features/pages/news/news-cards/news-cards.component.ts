import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { newData } from '../models/newM';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-cards',
  templateUrl: './news-cards.component.html',
  styleUrls: ['./news-cards.component.scss']
})
export class NewsCardsComponent implements OnInit {
  public newsLista: newData[]=[]

  constructor(private newsService: NewsService) {
    
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
        console.log(error.message)
      }
    })
  }
}
