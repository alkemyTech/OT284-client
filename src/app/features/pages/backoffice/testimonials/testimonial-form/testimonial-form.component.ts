import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TestimonialsService } from 'src/app/core/services/testimonials.service';
import { Testimonial } from 'src/app/shared/interfaces/testimonial';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.scss']
})
export class TestimonialFormComponent implements OnInit, OnChanges {

  public editor = ClassicEditor;
  public formulario!: FormGroup;
  private imgBase64!: any;
  @Input() element: any = {};
  @Output() testimonialEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private service: TestimonialsService) {
  }

  ngOnChanges() {
    // this.listadoTestimonios();
    this.formulario = this.fb.group({
      'txtName': [this.element.name ? this.element.name : '', [Validators.required, Validators.minLength(4)]],
      'txtDescription': [this.element.description ? this.element.description : '', [Validators.required]],
      'img': [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  enviar() {
    if (this.formulario.valid && this.imgBase64) {
      //ENVIAR
      let testimonio: Testimonial = this.element;
      let method = 'post';

      if (Object.entries(this.element).length > 0) {
        method = 'put';
        testimonio = this.element;
      }

      testimonio.name = this.formulario.controls.txtName.value;
      testimonio.image = this.imgBase64;
      testimonio.description = this.formulario.controls.txtDescription.value;

      this.testimonialEmitter.emit({ 'testimonio': testimonio, 'method': method });
    }
    else {
      //FORM INVALIDO
    }
  }

  fileEvent(e: Event) {
    let imagen = this.formulario.controls.img.value;
    var allowedExtensions = /(.jpg|.png)$/i;

    if (allowedExtensions.exec(imagen.name)) {
      this.convertFileToBase64(imagen);
    }
    else {
      console.log("El archivo no es imagen");
      this.imgBase64 = null;
      this.formulario.controls.img.setErrors({
        invalidExtension: true
      })
    }
  }


  // listadoTestimonios() {
  //   this.service.getTestimonials().subscribe((data: any) => {
  //     if (data.success) {
  //       console.log(data.data);
  //     } else {
  //       //error
  //     }
  //   })
  // }

  async convertFileToBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgBase64 = reader.result?.toString();
      console.log(this.imgBase64);
    };
  }

}
