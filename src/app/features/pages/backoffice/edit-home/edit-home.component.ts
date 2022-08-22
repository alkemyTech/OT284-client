import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.scss']
})
export class EditHomeComponent implements OnInit {

  public formulario!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      'txtMensaje': ['', [Validators.required, Validators.minLength(20)]],
      'img1': [null, [Validators.required]],
      'img2': [null, [Validators.required]],
      'img3': [null, [Validators.required]],
      'txtimg1': ['', [Validators.required]],
      'txtimg2': ['', [Validators.required]],
      'txtimg3': ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  enviar() {
    console.info('FORMULARIO', this.formulario);
    console.log(this.formulario.valid);

    if(this.formulario.valid)
    {
      //ENVIAR
    }
  }

}
