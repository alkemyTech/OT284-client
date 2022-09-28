import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { Member } from '../../../../shared/interfaces/member';
import { AppState } from '../../../../state/app.state';
import { Observable } from 'rxjs';
import { selectMembers } from '../../../../state/selectors/organization.selectors';
import { NewsMembersService } from 'src/app/core/services/news-members.service';
import { loadMembers } from 'src/app/state/actions/organization.actions';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss']
})
export class MembersViewComponent implements OnInit {

  members$: Observable<Member[]>
  member: Member[];
  @Input() cantidadMiembros:number;

  constructor( private store: Store<AppState>, private memberServices: NewsMembersService ) { }

  ngOnInit(): void {
    this.store.dispatch(loadMembers());
    this.members$ = this.store.select(selectMembers);
    // this.memberServices.getMembers('3').subscribe((resp: any) => {
    //   this.member = resp.data
    // })
  }

}
