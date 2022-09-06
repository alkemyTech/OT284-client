import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../shared/interfaces/category';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  category: Category;
  form!: FormGroup;
  file!: any;
  Editor = ClassicEditor;

  constructor( private fb: FormBuilder, private categoryService: CategoryService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.createForm();

    this.route.params.subscribe( params => {
      let { id } = params;

      if ( id ) {
        this.categoryService.getCategoryById(id).subscribe( category => {
          this.category = category;
          this.form.get('image')?.removeValidators(Validators.required);
          this.form.setValue({
            name: category.name,
            image: '',
            description: category.description
          })
        })
      }
    })
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.minLength(4), Validators.required]],
      image: ['', Validators.required],
      description: ['', [Validators.required]],
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
            this.swalFire();
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
        this.swalFire();
        this.editCategory();
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
            this.swalFire();
            this.editCategory();
          }
        }
    }
  }

  createCategory() {
    this.categoryService.createCategory(this.form.value).subscribe((resp: any) => {
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Completado',
        text: resp.message
      });
    });
    this.createForm();
  }

  swalFire() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });

    Swal.showLoading();
  }

  editCategory() {
    if (this.category.id) {
      this.categoryService.updateCategory(this.category.id, this.form.value).subscribe((resp: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Completado',
          text: resp.message
        });
      });
    }
  }

}
