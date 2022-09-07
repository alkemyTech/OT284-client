import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/shared/interfaces/activity';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  activity:Activity

  constructor( private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activity = JSON.parse(this.route.snapshot.paramMap.get('activity')!)
  }

}
