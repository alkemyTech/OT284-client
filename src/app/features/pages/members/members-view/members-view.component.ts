import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../../../core/services/members.service';
import { Member } from '../../../../shared/interfaces/member';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss']
})
export class MembersViewComponent implements OnInit {

  members!: Member[];

  constructor( private membersService: MembersService ) { }

  ngOnInit(): void {
    this.membersService.getMembers().subscribe( resp => {
      console.log(resp);
    }
    )
  }

}
