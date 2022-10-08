import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/shared/interfaces/activity';
import { deleteActivity, loadActivities } from 'src/app/state/actions/activities.actions';
import { AppState } from 'src/app/state/app.state';
import { selectActivities } from 'src/app/state/selectors/activities.selector';
import { activitiesExample } from '../../../activities/activity-view/activities-example';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss']
})
export class ActivitiesPageComponent implements OnInit {

  displayedColumns: string[] = ['image','name', 'created_at', 'actions'];
  dataSource$ : Observable<Activity[]> 
  constructor(private store:Store<AppState>, private route:Router) { }

  ngOnInit(): void {
    this.store.dispatch(loadActivities());
    this.dataSource$ = this.store.select(selectActivities)

  }

  editActivity(activity: Activity){
    console.log(activity)
    this.route.navigate(["backoffice/activity/edit",{ activity: JSON.stringify(activity), formType: "edit"}])
  }

  deleteActivity(activity: Activity){
   this.store.dispatch(deleteActivity({id: activity.id}))
  }

  onCreateClick(){
    this.route.navigate(["backoffice/activity/create", {formType: "create"}])
  }

}
