import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Organization } from '../../../../shared/interfaces/organization';
import { loadOrganization, loadedOrganization } from '../../../../state/actions/organization.actions';
import { selectLoading, selectOrganization } from '../../../../state/selectors/organization.selectors';
import { AppState } from '../../../../state/app.state';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.scss']
})
export class AboutViewComponent implements OnInit {

  organization$: Observable<Organization>;
  loading$: Observable<boolean>;

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.store.dispatch(loadOrganization());

    this.loading$ = this.store.select(selectLoading);
    this.organization$ = this.store.select(selectOrganization);
  }

}
