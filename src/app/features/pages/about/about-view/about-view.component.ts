import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Organization } from '../../../../shared/interfaces/organization';
import { Member } from '../../../../shared/interfaces/member';
import { loadOrganization, loadMembers } from '../../../../state/actions/organization.actions';
import { selectLoading, selectOrganization } from '../../../../state/selectors/organization.selectors';
import { AppState } from '../../../../state/app.state';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.scss']
})
export class AboutViewComponent implements OnInit {

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.store.dispatch(loadOrganization());
    this.store.dispatch(loadMembers());
  }

}
