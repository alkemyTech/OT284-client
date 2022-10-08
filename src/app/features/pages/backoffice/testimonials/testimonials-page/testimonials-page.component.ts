import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TestimonialsService } from 'src/app/core/services/testimonials.service';
import { MatAlertDialogComponent } from 'src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component';

@Component({
  selector: 'app-testimonials-page',
  templateUrl: './testimonials-page.component.html',
  styleUrls: ['./testimonials-page.component.scss']
})
export class TestimonialsPageComponent implements OnInit {

  testimonialParam: Object = {};
  constructor(private _route: ActivatedRoute, private service: TestimonialsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    let id: any = this._route.snapshot.paramMap.get('id');

    if (id) {
      this.service.getATestimonial(id).subscribe((data: any) => {
        this.testimonialParam = data.data;
      },
        (error: any) => {
          console.log(error);
          this.notifyError(error.error.message);
        })
    }
  }


  enviarTestimonio(data: any) {
    console.log(data);
    if (data.method == 'post') {
      //CREAR
      this.service.postTestimonial(data.testimonio).subscribe((data: any) => {
        console.info("EXITO", data);
      },
        (error: any) => {
          console.log(error);
          this.notifyError(error.message);
        })
    } else {
      //MODIFICAR
      this.service.putTestimonial(data.testimonio.id, data.testimonio).subscribe((data: any) => {
        console.info("EXITO", data);
      },
        (error: any) => {
          console.log(error);
          this.notifyError(error.message);
        })
    }
  }

  notifyError(message: string) {
    this.dialog
      .open(MatAlertDialogComponent, {
        data: {
          title: 'Ocurrio un error. Intente de nuevo mas tarde',
          message: `el error: ${message}`,
          confirmText: 'Aceptar'
        }
      })
  }


}
