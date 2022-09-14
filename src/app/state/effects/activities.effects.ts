import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { activitiesActionTypes, editActivitySuccess } from '../actions/activities.actions';

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
    mergeMap((activity) => this.activitiesService.addActivity(activity)
      .pipe(
        map(message => ({ type: activitiesActionTypes.addActivitySuccess, payload: message })),
        catchError(() => EMPTY)
      ))
    )
  );

  editActivity$ = createEffect(() => this.actions$.pipe(
    ofType(activitiesActionTypes.editActivity),
    mergeMap((data) => this.activitiesService.editActivity(data)
      .pipe(
        map(message => (editActivitySuccess({message}))),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private activitiesService: ActivitiesService,
  ) {}
}