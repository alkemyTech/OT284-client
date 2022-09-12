import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import { of } from "rxjs";
import { mergeMap, map, catchError, tap } from "rxjs/operators";
import { NewsService } from "src/app/features/pages/news/news.service";
import { MatAlertDialogComponent } from "src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component";

@Injectable()
export class NewsEffects{

    loadNews$= createEffect(()=>this.actions$.pipe(
        ofType(newsActions.loadNews),
        mergeMap(()=>this.srcNews.verNews()
        .pipe(
            map(news=>newsActions.loadedNews({news})),
            catchError((error:HttpErrorResponse) => of(newsActions.errorLoadedNews(error))
            )
        )
        )
    )
    )

    errorNews$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.errorLoadedNews),
        tap((action)=>this.dialog.open(MatAlertDialogComponent,{
            data:{text:'Error al cargar novedades', message: action.message},
        }))
    ),
        {dispatch:false}
    )

    constructor(
        private actions$:Actions,
        private srcNews:NewsService,
        public dialog: MatDialog
    ){}
}