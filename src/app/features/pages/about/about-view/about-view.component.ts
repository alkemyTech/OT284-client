import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AboutService } from '../../../../core/services/about.service';
import { Organization } from '../../../../shared/interfaces/organization';
import { Member } from '../../../../shared/interfaces/member';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.scss']
})
export class AboutViewComponent implements OnInit {

  organization$!: Observable<Organization>
  members!: Member[];

  constructor( private aboutService: AboutService ) { }

  ngOnInit(): void {
    this.organization$ = this.aboutService.getOrganization();
    this.aboutService.getMembers().subscribe( resp => this.members = resp);
  }

}
