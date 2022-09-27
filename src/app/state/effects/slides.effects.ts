import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { NewsSlidesService } from 'src/app/core/services/news-slides.service';

@Injectable()
export class SlidesEffects {

  loadSlides$ = createEffect(() => this.actions$.pipe(
    ofType('[Slides List] Load slides'),
    mergeMap((action:any) => 
      this.slidesService.getSlideFilter(action.parameters)
      .pipe(
        map( slides => ({type: '[Slides List] Load slides success', slides}) ),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private slidesService: NewsSlidesService
  ) {}
}