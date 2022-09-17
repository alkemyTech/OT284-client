import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Activity } from 'src/app/shared/interfaces/activity';
import { AppState } from 'src/app/state/app.state';
import { activitiesExample } from '../../../activities/activity-view/activities-example';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss']
})
export class ActivitiesPageComponent implements OnInit {

  displayedColumns: string[] = ['name', 'image', 'created_at', 'actions'];
  dataSource : Activity[]= activitiesExample

  constructor(private store:Store<AppState>, private route:Router) { }

  ngOnInit(): void {
  }

  editActivity(activity: Activity){
    console.log(activity)
    this.route.navigate(["backoffice/activity/edit",{ activity: JSON.stringify(activity)}])
  }

  deleteActivity(activity: Activity){
    console.log(activity)
  }

}
