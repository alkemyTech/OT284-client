import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { NewsSlidesService } from "src/app/core/services/news-slides.service";
import { MatAlertDialogComponent } from "src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component";
import { Slides } from "src/app/shared/interfaces/slides";
import { loadSlides } from "src/app/state/actions/slides.action";
import { selectListSlides, selectSlidesLoading } from "src/app/state/selectors/slides.selector";
import { SlidesServiceService } from "../slides-form/slides-service.service";

@Component({
  selector: "app-slides-view",
  templateUrl: "./slides-view.component.html",
  styleUrls: ["./slides-view.component.scss"],
})
export class SlidesViewComponent implements OnInit {
  constructor(
    private slides: NewsSlidesService,
    public dialog: MatDialog,
    private slidesForm: SlidesServiceService,
    private router: Router,
    private store: Store<any>
  ) { }
  displayedColumns: string[] = ["image", "name", "order", "actions"];
  dataSource = new MatTableDataSource<Slides>();
  row: Slides[];
  routerPath = "create";
  linkRef = "Crear Slide";

  updateTable() {
    // this.row.sort((a: any, b: any) => a.order - b.order);
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
          this.slides.deleteSlide(this.row[i].id).subscribe((data) => {
            console.log(data);
          });
          this.row = this.row.filter((e: Slides) => e.id != this.row[i].id);
          this.updateTable();
        }
      });
  }

  editSlide(i: number) {
    this.slidesForm.editSlideData = this.row[i];
    this.slidesForm.isEditing = true;
    this.router.navigateByUrl("backoffice/slides/edit");
  }

  ngOnInit(): void {
    this.searchSlides("");
  }

  searchSlides(event: any) {
    this.store.dispatch(loadSlides({ parameters: event }));

    this.store.select(selectListSlides).subscribe((data: Slides[]) => {
      this.row = data;
      console.log("asddas",data);
      
      this.updateTable();
    })
  }

}
