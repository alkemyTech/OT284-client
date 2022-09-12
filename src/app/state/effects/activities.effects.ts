import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { activitiesActionTypes } from '../actions/activities.actions';

@Injectable()
export class ActivitiesEffects {

  loadActivities$ = createEffect(() => this.actions$.pipe(
    ofType(activitiesActionTypes.loadActivities),
    mergeMap(() => this.activitiesService.getActivities()
      .pipe(
        map(activities => ({ type: activitiesActionTypes.loadActivitiesSuccess, payload: activities })),
        catchError(() => EMPTY)
      ))
    )
  );

  addActivity$ = createEffect(() => this.actions$.pipe(
    ofType(activitiesActionTypes.addActivity),
    mergeMap(() => this.activitiesService.addActivity()
      .pipe(
        map(message => ({ type: activitiesActionTypes.addActivitySuccess, payload: message })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private activitiesService: ActivitiesService,
  ) {}
}