import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-welcometext',
  templateUrl: './home-welcometext.component.html',
  styleUrls: ['./home-welcometext.component.scss']
})
export class HomeWelcometextComponent implements OnInit {

  @Input() welcomeText:string;
  constructor() { }

  ngOnInit(): void {
  }

}
