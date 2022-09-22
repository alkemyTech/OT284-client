import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ActivitiesService } from 'src/app/core/services/activities.service';
import { Activity } from 'src/app/shared/interfaces/activity';
import { activitiesActionTypes, addActivity, addActivitySuccess, deleteActivity, deleteActivitySuccess, editActivity, editActivitySuccess, loadActivitiesSuccess } from '../actions/activities.actions';

@Injectable()
export class ActivitiesEffects {

  loadActivities$ = createEffect(() => this.actions$.pipe(
    ofType(activitiesActionTypes.loadActivities),
    mergeMap(() => this.activitiesService.getActivities()
      .pipe(
        map((activities: any) => loadActivitiesSuccess({ activities })),
        catchError(() => EMPTY)
      ))
    )
  );

  addActivity$ = createEffect(() => this.actions$.pipe(
    ofType(addActivity),
    mergeMap((action) => this.activitiesService.postActivity(action.activity)
      .pipe(
        map((activity: Activity) => addActivitySuccess( {activity })),
        catchError(() => EMPTY)
      ))
    )
  );

  editActivity$ = createEffect(() => this.actions$.pipe(
    ofType(editActivity),
    mergeMap((action) => this.activitiesService.putActivity(action.id,action.data)
      .pipe(
        map((activity: Activity) => editActivitySuccess({activity})),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteActivity$ = createEffect(() => this.actions$.pipe(
    ofType(deleteActivity),
    mergeMap((action) => this.activitiesService.deleteActivity(action.id)
      .pipe(
        map((data: any) => deleteActivitySuccess( data.message )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private activitiesService: ActivitiesService,
  ) {}
}