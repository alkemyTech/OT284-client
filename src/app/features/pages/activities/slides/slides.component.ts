import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/interfaces/activity';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {

  @Input() activity:Activity

  constructor() { }

  ngOnInit(): void {
  }

}
