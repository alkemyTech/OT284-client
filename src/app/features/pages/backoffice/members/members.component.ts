
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatAlertDialogComponent } from 'src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component';
import { Store } from '@ngrx/store';
import { fromEvent, Observable } from 'rxjs';
import { Member } from 'src/app/shared/interfaces/member';
import { deleteMember, loadMembers } from 'src/app/state/actions/members.actions';
import { AppState } from 'src/app/state/app.state';
import { selectMembers, selectMembersLoading } from 'src/app/state/selectors/members.selectors';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  loading$: Observable<boolean> = new Observable()
  members: Member[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'photo', 'actions'];
  search_string: string;
  constructor(private store: Store<AppState>,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectMembersLoading);
    this.store.dispatch(loadMembers({search: ''}));
    this.getListMembers();

    this.searchMember();
  }

  searchMember(){
    let searchString: string = "";
    const search = document.getElementById('search')!;
    const keyup = fromEvent(search, 'keyup');
    keyup.pipe(
      map((e:any) => searchString = e.currentTarget.value),
      debounceTime(200)
    ).subscribe(() => this.store.dispatch(loadMembers({search: searchString})))
  }

  getListMembers(){
    this.store.select(selectMembers).subscribe(
      (members) => {
        this.members = members;
        this.dataSource = new MatTableDataSource(this.members);
      }
    )
  }

  delete(id:number, name: string){
    this.dialog
      .open(MatAlertDialogComponent, {
        data: {
          title: "Confirmación",
          message: `¿Estás seguro que deseas eliminar a '${name}' ?`,
          confirmText: "Sí",
          cancelText: "No",
        },
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.store.dispatch(deleteMember({id}))
        }
      });
  }

}
