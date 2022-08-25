import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AboutService } from 'src/app/core/services/about.service';
import { Organization } from 'src/app/shared/interfaces/organization';
import { PhonePipe } from '../../../../shared/helpers/phonePipe';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
})
export class ContactViewComponent implements OnInit {
  

  constructor(private aboutService:AboutService) { }

  organization$ !: Observable<Organization>;
  messageResponse: any =null;

  ngOnInit(): void {
    this.organization$  = this.aboutService.getOrganization()
    console.log(this.organization$ )
  }

  receiveMessage($event: any) {
    this.messageResponse = $event
  }

}
