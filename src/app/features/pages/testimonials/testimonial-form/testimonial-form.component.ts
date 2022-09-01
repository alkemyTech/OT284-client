import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestimonialsService } from 'src/app/core/services/testimonials.service';
import { Testimonial } from 'src/app/shared/interfaces/testimonial';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.scss']
})
export class TestimonialFormComponent implements OnInit {

  public formulario!: FormGroup;
  imgBase64!: any;
  @Input() element: any = {}

  constructor(private fb: FormBuilder, private service: TestimonialsService) {
  }

  ngOnInit(): void {
    this.listadoTestimonios();
    this.formulario = this.fb.group({
      'txtName': [this.element.name ? this.element.name : '', [Validators.required, Validators.minLength(4)]],
      'txtDescription': [this.element.description ? this.element.description : '', [Validators.required]],
      'img': [null, [Validators.required]]
    })
  }

  async enviar() {
    console.info('FORMULARIO', this.formulario);
    console.log(this.formulario.valid);

    if (this.formulario.valid) {
      //ENVIAR
      let testimonio: Testimonial;

      testimonio = {
        name: 'Prueba Testimonio',
        image: this.imgBase64,
        description: 'Descripcion generica'
      }

      if (Object.entries(this.element).length == 0) {
        //Agregar -> POST
        this.service.postTestimonial(testimonio).subscribe((data: any) => {
          if (data.error) {
            console.info('HUBO UN ERROR: ', data.error);
          }
          else {
            console.info("EXITO", data);
          }
        })

      }
      else {
        //Modificar -> PUT
        //FIXME ->                 466 = element.id
        this.service.putTestimonial(466, testimonio).subscribe((data: any) => {
          if (data.error) {
            console.info('HUBO UN ERROR: ', data.error);
          }
          else {
            console.info("EXITO", data);
          }
        })
        
      }

    }
    else {

      //ERROR
    }
  }

  async fileEvent(e: Event) {
    let imagen = this.formulario.controls.img.value;
    // console.log(imagen);
    this.convertFileToBase64(imagen);
  }


  listadoTestimonios() {
    this.service.getTestimonials().subscribe((data: any) => {

      if (data.success) {
        console.log(data.data);
      } else {
        //error
      }

    })
  }

  async convertFileToBase64(file: any) {
    const reader = new FileReader();
    let resultado;
    reader.readAsDataURL(file);
    reader.onload = () => {
      resultado = reader.result
      this.imgBase64 = reader.result?.toString();
      console.log(this.imgBase64);
    };
  }

}
