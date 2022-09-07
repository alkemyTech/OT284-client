import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/shared/interfaces/activity';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {

  @Input() activity:Activity

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToActivityDetail() {
    this.router.navigate(['/activity-detail', { activity: JSON.stringify(this.activity)}]);
  }

}
