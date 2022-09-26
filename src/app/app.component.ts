import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { fader, slideInAnimation } from './shared/animations/transitionPagesAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation,fader],
})
export class AppComponent {
  title:string = 'base-ong-angular-client';

  constructor() {}

}
