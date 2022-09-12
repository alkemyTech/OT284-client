import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivitiesService } from 'src/app/core/services/activities.service';
import { Activity } from 'src/app/shared/interfaces/activity';
import { activitiesExample } from './activities-example';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent implements OnInit {

  activities$: Observable<Activity[]>

  constructor(private httpActServ: ActivitiesService) { }

  ngOnInit(): void {
    this.getListOfActivities()
  }

  private getListOfActivities(){
    this.httpActServ.getActivities().subscribe(
      (data: any)=>{
        this.activities$ = of(data)
        console.log(this.activities$)
      },
      (error) =>{
        console.log(error)
      }
    )
  }

}
