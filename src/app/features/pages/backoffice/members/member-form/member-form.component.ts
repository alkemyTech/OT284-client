import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {

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
      facebookUrl: ['', [Validators.pattern(/^(http\:\/\/|https:\/\/)?(www.)?(facebook.com\/)((@)?[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF0-9A-Za-z. \-%]{1,}\/?)$/i), Validators.required]],
      linkedinUrl: ['', [Validators.pattern(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm), Validators.required]]
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
