import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/shared/interfaces/activity';
import { selectActivities } from 'src/app/state/selectors/activities.selector';
import { activitiesExample } from './activities-example';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent implements OnInit {

  activities$: Observable<Activity[]>

  constructor(private store:Store<any>) { }

  ngOnInit(): void {
    this.activities$ = this.store.select(selectActivities)
  }

}
