import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import { of } from "rxjs";
import { mergeMap, map, catchError, tap } from "rxjs/operators";
import { NewsService } from "src/app/features/pages/news/news.service";
import { MatAlertDialogComponent } from "src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component";
import { MatAlertErrorComponent } from "src/app/shared/components/mat-alert-error/mat-alert-error.component";
import Swal from "sweetalert2";
import * as newsActions from '../actions/news.action';

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

    alertDeleteNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.alertDelete),
        tap(()=>Swal.fire({
            title: `Esta seguro que quiere eliminar la novedad?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
          }).then((result)=>{
            if(result.isConfirmed){
                newsActions.deleteNew;
            }else if (result.isDenied) {
                newsActions.notDelete;
            }
            }
        )
        )
    )
    ) 

    notDeleteNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.notDelete),
        tap(()=>Swal.fire('The new was not deleted', '', 'info'))
    ))

    //Hacer reducer de notDelete, deletedNew, errorDeleteNew

    deleteNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.deleteNew),
        mergeMap((action)=>this.srcNews.deleteNew(action.newToDelete.id)
        .pipe(
            map((action)=>newsActions.deletedNew(action.newToDelete)),
            catchError((error:HttpErrorResponse) => of(newsActions.errorDeleteNew))
        ))
    )) 

    errorDeleteNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.errorDeleteNew),
        tap(()=>this.dialog.open(MatAlertErrorComponent,{
            data:{text:"Error al eliminar novedad", message:"Error de conexión al eliminar novedad"},
        }))
    ))

    constructor(
        private actions$:Actions,
        private srcNews:NewsService,
        public dialog: MatDialog
    ){}
}