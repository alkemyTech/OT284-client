import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import { EMPTY } from "rxjs/internal/observable/empty";
import { mergeMap, map, catchError } from "rxjs/operators";
import { NewsService } from "src/app/features/pages/news/news.service";

@Injectable()
export class NewsEffects{

    loadNews$= createEffect(()=>this.actions$.pipe(
        ofType('[News List] Load News'),
        mergeMap(()=>this.srcNews.verNews()
        .pipe(
            map(news=>({type:'[News List] Loaded News', news})),
            catchError(()=>EMPTY) 
        ))
        )
    )
    constructor(
        private actions$:Actions,
        private srcNews:NewsService
    ){}
}