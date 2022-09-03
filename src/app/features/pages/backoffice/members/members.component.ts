import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MEMBERS_DATA } from './members.mock';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  dataSource = new MatTableDataSource(MEMBERS_DATA);
  displayedColumns: string[] = ['name', 'photo', 'delete', 'edit'];
  constructor() { }

  ngOnInit(): void {
  }

}
