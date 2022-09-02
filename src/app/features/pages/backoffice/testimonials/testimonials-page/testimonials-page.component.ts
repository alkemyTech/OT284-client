import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestimonialsService } from 'src/app/core/services/testimonials.service';
import { Testimonial } from 'src/app/shared/interfaces/testimonial';

@Component({
  selector: 'app-testimonials-page',
  templateUrl: './testimonials-page.component.html',
  styleUrls: ['./testimonials-page.component.scss']
})
export class TestimonialsPageComponent implements OnInit {

  testimonialParam: Object = {};
  constructor(private _route: ActivatedRoute, private service: TestimonialsService) { }

  ngOnInit(): void {
    let id: any = this._route.snapshot.paramMap.get('id');

    if (id) {
      this.service.getATestimonial(id).subscribe((data: any) => {
        this.testimonialParam = data.data;
      })
    }
  }


  enviarTestimonio(data: any) {
    console.log(data);
    if (data.method == 'post') {
      //CREAR
      this.service.postTestimonial(data.testimonio).subscribe((data: any) => {
        if (data.error) {
          console.info('HUBO UN ERROR: ', data.error);
        }
        else {
          console.info("EXITO", data);
        }
      })
    } else {
      //MODIFICAR
      this.service.putTestimonial(data.testimonio.id, data.testimonio).subscribe((data: any) => {
        if (data.error) {
          console.info('HUBO UN ERROR: ', data.error);
        }
        else {
          console.info("EXITO", data);
        }
      })
    }
  }


}
