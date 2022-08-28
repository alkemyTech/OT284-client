import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Member } from '../../../../shared/interfaces/member';
import { AppState } from '../../../../state/app.state';
import { Observable } from 'rxjs';
import { selectMembers } from '../../../../state/selectors/organization.selectors';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss']
})
export class MembersViewComponent implements OnInit {

  members$: Observable<Member[]>

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.members$ = this.store.select(selectMembers);
  }

}
