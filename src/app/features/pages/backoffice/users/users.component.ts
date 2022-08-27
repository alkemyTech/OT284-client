import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

import { MatAlertDialogComponent } from "src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component";

import { NewsUsersService } from "./services/newsUsers.service";
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
  urlAPI: string = "https://ongapi.alkemy.org/api/users";
  linkRef = "Crear Usuario";
  routerPath = "create";
  pageIndex = 0;
  pageSize = 10;

  @ViewChild("map", { static: false }) map: HTMLElement;

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

  editUser(i: number) {
    const realIndex = i + this.pageIndex * this.pageSize;
    this.user.editUserData = this.row[realIndex];
    this.router.navigateByUrl("backoffice/users/edit");
  }

  deleteUser(i: number) {
    this.dialog
      .open(MatAlertDialogComponent, {
        data: `¿Estás seguro que deseas borrar este usuario?`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          const realIndex = i + this.pageIndex * this.pageSize;
          this.http
            .delete(this.urlAPI, this.row[realIndex].id)
            .subscribe((data) => {
              console.log(data);
            });
          this.row.splice(realIndex, 1);
          this.updateTable();
        }
      });
  }

  // Mejorar esto ?

  ngOnInit(): void {
    this.http.get(this.urlAPI).subscribe((data: any) => {
      for (let i = 0; i < data.data.length; i++) {
        this.row.push({
          id: data.data[i].id,
          name: data.data[i].name,
          email: data.data[i].email,
          password: data.data[i].password,
          role_id: data.data[i].role_id,
        });
      }

      this.updateTable();
      this.dataSource.paginator = this.paginator;
    });
  }
}
