import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/interfaces/activity';
import { activitiesExample } from './activities-example';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent implements OnInit {

  activities: Activity[] = activitiesExample

  constructor() { }

  ngOnInit(): void {
  }

}
