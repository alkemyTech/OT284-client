import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { NewsMembersService } from 'src/app/core/services/news-members.service';
import { loadMembers } from 'src/app/state/actions/members.actions';
import { MEMBERS_DATA } from './members.mock';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  dataSource = new MatTableDataSource(MEMBERS_DATA);
  displayedColumns: string[] = ['name', 'photo', 'delete', 'edit'];
  constructor(private newsMembersService: NewsMembersService, private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(loadMembers());
    this.newsMembersService.getMembers().subscribe(
      {
        next: response => {
          console.log(response);
        },
        error: error => {
          console.error(`error : ${error}`);
        },
        complete: () => console.log("peticion completada con exito.")
      }
    );

    this.newsMembersService.getMember(851).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(`error : ${error}`);
      },
      complete: () => console.log("peticion completada con exito.")
    });
  }

}
