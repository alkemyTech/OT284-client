import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  file!: any;
  Editor = ClassicEditor;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.minLength(4), Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  invalidInput(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched
  }

  invalidForm() {
    return Object.values(this.form.controls).forEach( control => control.markAsTouched() );
  }

  /* check if image is jpg or png */
  fileExtensionCheck( file: any ) {
    const extensionFile = file.type;
    
    if ( extensionFile === 'image/jpg' || extensionFile === 'image/png' ) {
      return true
    } else {
      return false
    }
  }

  // convertFileToBase64(file: any) {
  //   const reader = new FileReader();

  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     console.log(reader.result);
  //   }
  // }

  onSubmit() {
    if (this.file) {
      /* check if file extension is valid */
      if( !this.fileExtensionCheck(this.file) ) {
        /* if invalid mark control as incorrect */
        this.form.controls['image'].setErrors({'incorrect': true});
        /* mark all controls */
        if ( this.form.invalid ) {
          this.invalidForm();
        }
      } else {
        /* the image is valid */
        this.form.controls['image'].setErrors(null);

        const reader = new FileReader();

        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.form.value.image = reader.result;

          if ( this.form.invalid ) {
            this.invalidForm();
          } else {
            /* make the call to the API */
            console.log(this.form.value);
          }
        }
      }
    } else {
      /* there is no image */
      if ( this.form.invalid ) {
        this.invalidForm();
      }
    }
  }

}
