import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AboutService } from '../../../../core/services/about.service';
import { Organization } from '../../../../shared/interfaces/organization';
import { loadOrganization, loadedOrganization } from '../../../../state/actions/organization.actions';
import { selectLoading } from '../../../../state/selectors/organization.selectors';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.scss']
})
export class AboutViewComponent implements OnInit {

  organization$!: Observable<Organization>;
  loading$: Observable<boolean>;

  constructor( private aboutService: AboutService, private store: Store<any> ) { }

  ngOnInit(): void {
    // this.organization$ = this.aboutService.getOrganization();
    this.loading$ = this.store.select(selectLoading)
    this.store.dispatch(loadOrganization());
    
    this.aboutService.getOrganization().subscribe( resp => {
      this.store.dispatch(loadedOrganization({organization: resp}));
    })
  }

}
