import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AboutService } from '../../../../core/services/about.service';
import { Organization } from '../../../../shared/interfaces/organization';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.scss']
})
export class AboutViewComponent implements OnInit {

  organization$!: Observable<Organization>

  constructor( private aboutService: AboutService ) { }

  ngOnInit(): void {
    this.organization$ = this.aboutService.getOrganization();
  }

}
