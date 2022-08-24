import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../../shared/interfaces/member';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss']
})
export class MembersViewComponent implements OnInit {

  @Input() members!: Member[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.members);
  }

}
