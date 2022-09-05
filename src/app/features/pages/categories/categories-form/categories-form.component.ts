import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../shared/interfaces/category';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @Input() category: Category;

  form!: FormGroup;
  file!: any;
  Editor = ClassicEditor;

  constructor( private fb: FormBuilder, private categoryService: CategoryService ) { }

  ngOnInit(): void {
    this.category = {
      id: 2296,
      name: "big ooooooooooof2",
      description: "<p>test2</p>",
      image: "http://ongapi.alkemy.org/storage/gpqFivkw3I.png",
      created_at: "2022-09-02T12:18:59.000000Z",
    }

    if (this.category) {
      this.editForm();
    } else {
      this.createForm();
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: [this.category?.name ?? '', [Validators.minLength(4), Validators.required]],
      image: ['', Validators.required],
      description: [this.category?.description ?? '', [Validators.required]],
    })
  }

  editForm() {
    this.form = this.fb.group({
      name: [this.category?.name ?? '', [Validators.minLength(4), Validators.required]],
      image: [''],
      description: [this.category?.description ?? '', [Validators.required]],
    })
  }

  invalidInput(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched
  }

  invalidForm() {
    return Object.values(this.form.controls).forEach( control => control.markAsTouched() );
  }

  fileExtensionCheck( file: any ) {
    const extensionFile = file.type;
    
    if ( extensionFile === 'image/jpg' || extensionFile === 'image/png' ) {
      return true;
    } 

    return false;
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if(!this.fileExtensionCheck(this.file)) {
      this.setImageError();
    }
  }

  setImageError() {
    this.form.controls['image'].setErrors({'incorrect': true});
    if ( this.form.invalid ) {
      this.invalidForm();
    }
  }

  onSubmit() {
    if (!this.category) {
      /* create category */
      if (this.file && this.fileExtensionCheck(this.file)) {
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
            this.createCategory();
          }
        }
      } else {
        /* there is no image */
        if ( this.form.invalid ) {
          this.invalidForm();
        }
      }
    } else {
      /* edit category */
      if (!this.file) {
        this.form.removeControl('image'); 
        this.editCategory()
        return;
      }
      const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.form.value.image = reader.result;
          if ( this.form.invalid ) {
            this.invalidForm();
          } else {
            /* make the call to the API */
            this.editCategory();
          }
        }
    }
  }

  createCategory() {
    // this.categoryService.createCategory(this.form.value).subscribe(resp => console.log(resp));
    console.log('CREAR');
    console.log(this.form.value);
    this.createForm();
  }

  editCategory() {
    console.log('EDITAR');
    console.log(this.form.value);
    this.editForm();
    // if (this.category.id) {
    //   this.categoryService.updateCategory(this.category.id, this.form.value).subscribe(resp => console.log(resp));
    // }
  }

}
