import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { fromEvent, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { MatAlertDialogComponent } from "src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component";
import { UsersService } from "./services/users.service";
import { userData } from "../../../../shared/interfaces/userInterface";
import { Store } from "@ngrx/store";
import {
  deleteUserAction,
  loadUsers,
} from "src/app/state/actions/users.actions";
import {
  selectUsers,
  selectUsersLoading,
} from "src/app/state/selectors/users.selectors";
import { AppState } from "src/app/state/app.state";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "actions"];
  dataSource = new MatTableDataSource<userData>();
  @ViewChild("users", { static: true })
  paginator: MatPaginator;
  row: userData[];
  linkRef = "Crear Usuario";
  routerPath = "create";
  pageIndex = 0;
  pageSize = 10;
  @ViewChild("searchInput", { static: true })
  searchInput: ElementRef;
  @ViewChild("roleSelect", { static: true })
  roleSelect: ElementRef;
  loading$: Observable<boolean>;

  constructor(
    private user: UsersService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  updateTable() {
    this.dataSource.data = this.row;
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe((data: any) => {
      this.pageIndex = data.pageIndex;
      this.pageSize = data.pageSize;
    });
  }

  roleSearch() {
    const roleSelect = this.roleSelect.nativeElement.value;
    const searchInput = this.searchInput.nativeElement.value;
    this.store.dispatch(
      loadUsers({
        parameters: searchInput ? searchInput : "",
        parametersRole: roleSelect != 0 ? roleSelect : "",
      })
    );
    this.updateTable();
  }

  search() {
    fromEvent(this.searchInput.nativeElement, "keyup")
      .pipe(
        debounceTime(1000),
        map((event: any) => {
          return event.target.value;
        }),
        distinctUntilChanged()
      )
      .subscribe((searchData: string) => {
        if (searchData.length < 2) {
          this.fillTable();
          this.updateTable();
        } else {
          this.roleSearch();
        }
      });
  }

  editUser(i: number) {
    const realIndex = i + this.pageIndex * this.pageSize;
    this.user.editUserData = this.row[realIndex];
    this.router.navigateByUrl("backoffice/users/edit");
    this.user.userIsEditing = true;
  }

  deleteUser(i: number) {
    const realIndex = i + this.pageIndex * this.pageSize;
    this.dialog
      .open(MatAlertDialogComponent, {
        data: {
          title: "Confirmación",
          message: `¿Estás seguro que deseas borrar el usuario ${this.row[realIndex].name}?`,
          confirmText: "Sí",
          cancelText: "No",
        },
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.store.dispatch(
            deleteUserAction({ parameters: this.row[realIndex].id })
          );
          this.row = this.row.filter(
            (e: any) => e.id != this.row[realIndex].id
          );

          this.updateTable();
        }
      });
  }

  fillTable() {
    const roleSelect = this.roleSelect.nativeElement.value;
    const searchInput = this.searchInput.nativeElement.value;
    this.store.dispatch(
      loadUsers({
        parameters: searchInput ? searchInput : "",
        parametersRole: roleSelect != 0 ? roleSelect : "",
      })
    );
  }

  ngOnInit(): void {
    this.fillTable();
    this.search();
    this.loading$ = this.store.select(selectUsersLoading);
    this.store.select(selectUsers).subscribe((data: any) => {
      if (data.data) {
        this.row = data.data;
        this.updateTable();
      } else {
        console.log("no data");
      }
    });
  }
}
