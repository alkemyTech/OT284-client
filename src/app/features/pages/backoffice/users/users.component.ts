import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

import { MatAlertDialogComponent } from "src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component";
import { environment } from "src/environments/environment";

import { NewsUsersService } from "../../../../core/services/newsUsers.service";
import { UsersService } from "./services/users.service";

export interface apiData {
  id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
}

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "actions"];
  dataSource = new MatTableDataSource<apiData>();
  @ViewChild("users", { static: false })
  paginator: MatPaginator;
  row: apiData[] = [];
  linkRef = "Crear Usuario";
  routerPath = "create";
  pageIndex = 0;
  pageSize = 10;
  @ViewChild("searchInput", { static: true })
  searchInput: ElementRef;
  @ViewChild("roleSelect", { static: true })
  roleSelect: ElementRef;

  constructor(
    private user: UsersService,
    private http: NewsUsersService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  updateTable() {
    this.dataSource.data = this.row;
    this.paginator.page.subscribe((data: any) => {
      this.pageIndex = data.pageIndex;
      this.pageSize = data.pageSize;
    });
  }

  roleSearch() {
    const roleSelect = this.roleSelect.nativeElement.value;
    const searchInput = this.searchInput.nativeElement.value;
    this.http
      .getSearch(
        environment.url,
        searchInput ? searchInput : "",
        roleSelect != 0 ? roleSelect : ""
      )
      .subscribe((apiData: any) => {
        this.row = apiData.data;
        this.updateTable();
      });
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
          this.http
            .delete(environment.url, this.row[realIndex].id)
            .subscribe((data) => {
              console.log(data);
            });
          this.row.splice(realIndex, 1);
          this.updateTable();
        }
      });
  }

  fillTable() {
    const roleSelect = this.roleSelect.nativeElement.value;
    const searchInput = this.searchInput.nativeElement.value;
    this.http
      .getSearch(
        environment.url,
        searchInput ? searchInput : "",
        roleSelect != 0 ? roleSelect : ""
      )
      .subscribe((data: any) => {
        this.row = data.data;
        this.updateTable();
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnInit(): void {
    this.fillTable();
    this.search();
  }
}
