import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Organization } from '../../../../shared/interfaces/organization';
import { AppState } from '../../../../state/app.state';
import { selectOrganization } from '../../../../state/selectors/organization.selectors';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  organization$: Observable<Organization>

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.organization$ = this.store.select(selectOrganization);
  }

}
