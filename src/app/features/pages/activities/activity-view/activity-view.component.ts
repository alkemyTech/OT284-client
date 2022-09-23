import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatAlertErrorComponent } from 'src/app/shared/components/mat-alert-error/mat-alert-error.component';
import { Activity } from 'src/app/shared/interfaces/activity';
import { activitiesActionTypes, loadActivities, loadActivitiesError } from 'src/app/state/actions/activities.actions';
import { AppState } from 'src/app/state/app.state';
import { selectActivities, selectError } from 'src/app/state/selectors/activities.selector';
import { activitiesExample } from './activities-example';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent implements OnInit {

  activities$: Observable<Activity[]> = this.store.select(selectActivities)
  error$: Observable<string> = this.store.select(selectError)

  constructor(private store:Store<AppState>, actions$: Actions, dialog: MatDialog) { 
    actions$
      .pipe(ofType(activitiesActionTypes.loadActivitiesError))
      .subscribe((action:any) => (
        dialog
      .open(MatAlertErrorComponent, {
        data: {
          text: 'Ha ocurrido un error, Intente de nuevo mas tarde',
          message: `${action.error}.`,
        }
      })
      ));
  }

  ngOnInit(): void {
    this.store.dispatch(loadActivities())
  }

}
