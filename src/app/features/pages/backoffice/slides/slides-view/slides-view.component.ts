import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { NewsSlidesService } from "src/app/core/services/news-slides.service";
import { MatAlertDialogComponent } from "src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component";
import { Slides } from "src/app/shared/interfaces/slides";

@Component({
  selector: "app-slides-view",
  templateUrl: "./slides-view.component.html",
  styleUrls: ["./slides-view.component.scss"],
})
export class SlidesViewComponent implements OnInit {
  constructor(private slides: NewsSlidesService, public dialog: MatDialog) {}
  displayedColumns: string[] = ["name", "image", "order", "actions"];
  dataSource = new MatTableDataSource<Slides>();
  row: Slides[];
  routerPath = "create";
  linkRef = "Create Slide";

  updateTable() {
    this.dataSource.data = this.row;
  }

  deleteSlide(i: number) {
    this.dialog
      .open(MatAlertDialogComponent, {
        data: {
          title: "Confirmación",
          message: `¿Estás seguro que deseas borrar este slide?`,
          confirmText: "Sí",
          cancelText: "No",
        },
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.row = this.row.filter((e: Slides) => e.id != this.row[i].id);
          this.updateTable();
        }
      });
  }

  editSlide(i: number) {}

  ngOnInit(): void {
    this.slides.getSlide().subscribe((data: any) => {
      this.row = data.data;
      this.updateTable();
    });
  }
}
