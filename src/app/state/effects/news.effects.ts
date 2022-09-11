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
        ofType('[News List] Load News'),
        mergeMap(()=>this.srcNews.verNews()
        .pipe(
            map((news)=>({type:'[News List] Loaded News', news})),
            catchError((error:HttpErrorResponse) => of({ type: '[News List] Not Loaded News', message: error.message}))
            )
        )
        )
    )

    errorNews$=createEffect(()=>this.actions$.pipe(
        ofType('[News List] Not Loaded News'),
        tap(()=>this.dialog.open(MatAlertDialogComponent,{
            data:{text:'Error al cargar novedades', message: 'Error de conexión al cargar novedades'},
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