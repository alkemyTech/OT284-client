import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ActivitiesService } from 'src/app/core/services/activities.service';
import { activitiesActionTypes, addActivity, addActivitySuccess, editActivity, editActivitySuccess, loadActivitiesError, loadActivitiesSuccess } from '../actions/activities.actions';

@Injectable()
export class ActivitiesEffects {

  loadActivities$ = createEffect(() => this.actions$.pipe(
    ofType(activitiesActionTypes.loadActivities),
    mergeMap(() => this.activitiesService.getActivities()
      .pipe(
        map((activities: any) => loadActivitiesSuccess({ activities })),
        catchError((error: any) => of(loadActivitiesError({error})))
      )),
    )
  );

  addActivity$ = createEffect(() => this.actions$.pipe(
    ofType(addActivity),
    mergeMap((action) => this.activitiesService.postActivity(action.activity)
      .pipe(
        map((data: any) => addActivitySuccess( data.message )),
        catchError(() => EMPTY)
      ))
    )
  );

  editActivity$ = createEffect(() => this.actions$.pipe(
    ofType(editActivity),
    mergeMap((action) => this.activitiesService.putActivity(action.id,action.data)
      .pipe(
        map((data: any) => editActivitySuccess( data.message )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private activitiesService: ActivitiesService,
  ) {}
}