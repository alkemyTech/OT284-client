import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/shared/interfaces/activity';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  activity:Activity

  constructor( private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activity = JSON.parse(this.route.snapshot.paramMap.get('activity')!)
  }

  goToEditActivity(){
    this.router.navigate(['/backoffice/activity/create', { activity: JSON.stringify(this.activity)}])
  }

}
