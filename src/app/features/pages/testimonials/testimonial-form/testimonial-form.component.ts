import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TestimonialsService } from 'src/app/core/services/testimonials.service';
import { Testimonial } from 'src/app/shared/interfaces/testimonial';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.scss']
})
export class TestimonialFormComponent implements OnInit {

  public editor = ClassicEditor;
  public formulario!: FormGroup;
  private imgBase64!: any;
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

    if (this.formulario.valid && this.imgBase64) {
      //ENVIAR
      let testimonio: Testimonial;
      testimonio = {
        name: this.formulario.controls.txtName.value,
        image: this.imgBase64,
        description: this.formulario.controls.txtDescription.value
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
        this.service.putTestimonial(this.element.id, testimonio).subscribe((data: any) => {
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
    console.log(imagen);

    var allowedExtensions = /(.jpg|.png)$/i;

    if (allowedExtensions.exec(imagen.name)) {
      console.log("ES IMAGEN");
      this.convertFileToBase64(imagen);
    }
    else {
      console.log("NO ES IMAGEN");
      this.imgBase64 = null;
      this.formulario.controls.img.setErrors({
        invalidExtension: true
      })
    }



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
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgBase64 = reader.result?.toString();
      console.log(this.imgBase64);
    };
  }

}
