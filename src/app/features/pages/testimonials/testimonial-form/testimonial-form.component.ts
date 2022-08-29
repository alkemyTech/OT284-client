import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.scss']
})
export class TestimonialFormComponent implements OnInit {

  public formulario!: FormGroup;
  @Input() element: any = {}

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      'txtName': [this.element.name ? this.element.name : '', [Validators.required, Validators.minLength(4)]],
      'txtDescription': [this.element.description ? this.element.description : '', [Validators.required]],
      'img': [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  enviar() {
    console.info('FORMULARIO', this.formulario);
    console.log(this.formulario.valid);

    if (this.formulario.valid) {
      //ENVIAR
    }
  }


}
