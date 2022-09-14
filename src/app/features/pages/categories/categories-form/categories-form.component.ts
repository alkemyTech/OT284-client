import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Category } from '../../../../shared/interfaces/category';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { createCategory, getCategoryById, editCategory } from '../../../../state/actions/categories.actions';
import { Observable } from 'rxjs/internal/Observable';
import { selectCategories } from '../../../../state/selectors/categories.selectors';

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
  category$!: Observable<Category[]>;

  constructor( private fb: FormBuilder, private store: Store<AppState>, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.createForm();

    this.route.params.subscribe( params => {
      let { id } = params;

      if ( id ) {
        this.store.dispatch(getCategoryById({id}));
        this.category$ = this.store.select(selectCategories);

        this.category$.subscribe( categories => {
          this.category = categories[0];
          this.form.get('image')?.removeValidators(Validators.required);
          this.form.setValue({
            name: this.category.name,
            image: '',
            description: this.category.description
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
    this.store.dispatch(createCategory({category: this.form.value}));
    Swal.close();
    Swal.fire({
      icon: 'success',
      title: 'Completado',
      text: 'Categoría creada con éxito'
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
      this.store.dispatch(editCategory({id: this.category.id, category: this.form.value}));
      Swal.fire({
        icon: 'success',
        title: 'Completado',
        text: 'Categoría editada con éxito'
      });
    }
  }

}
