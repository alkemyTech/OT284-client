import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Category } from '../../../../shared/interfaces/category';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { createCategory, getCategoryById, editCategory } from '../../../../state/actions/categories.actions';
import { Observable } from 'rxjs/internal/Observable';
import { selectCategories, selectCategoriesError } from '../../../../state/selectors/categories.selectors';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  category: Category;
  form!: FormGroup;
  file!: any;
  image!: any;
  Editor = ClassicEditor;
  category$!: Observable<Category[]>;
  error$ = this.store.select(selectCategoriesError);
  error: any = null

  private imgBase64!: any;

  constructor( private fb: FormBuilder, private store: Store<AppState>, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {

    this.error$.subscribe(error => this.error = error);

    this.createForm();

    this.route.params.subscribe( params => {
      let { id } = params;

      if ( id ) {
        this.store.dispatch(getCategoryById({id}));
        this.category$ = this.store.select(selectCategories);

        this.category$.subscribe( categories => {
          this.category = categories[0];
          this.image = categories[0].image;
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
    const extensionFile = file.type.toLowerCase();
    return ( extensionFile === 'image/jpg' || extensionFile === 'image/png' || extensionFile === 'image/jpeg') ? true : false;
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if(!this.fileExtensionCheck(this.file)) {
      this.setImageError();
    } else {
      this.convertFileToBase64(this.file);
    }
  }

  convertFileToBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgBase64 = reader.result?.toString();
      this.form.controls.image.setValue(this.imgBase64);
      this.form.controls['image'].setErrors(null);
      this.image = reader.result;
    }
  }

  setImageError() {
    this.form.controls['image'].setErrors({'incorrect': true});
    this.imgBase64 = null;
    if ( this.form.invalid ) {
      this.invalidForm();
    }
  }

  onSubmit() {
    if (!this.category) {
      /* create category */
      if ( this.form.invalid ) {
        this.invalidForm();
        return;
      }
      this.createCategory();
    } else {
      /* edit category */
      if (!this.file) {
        this.form.removeControl('image');
        this.swalFire();
        this.editCategory();
        return;
      }

      if ( this.form.invalid ) {
        this.invalidForm();
        return;
      }
      this.editCategory();
    }
  }

  createCategory() {
    this.store.dispatch(createCategory({category: this.form.value}));
    Swal.showLoading();
    
    setTimeout(() => {
      if ( this.error ) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la categoría, intente con otro nombre.'
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Completado',
          text: 'Categoría creada con éxito'
        }).then(() => {
          this.router.navigateByUrl('/backoffice/categories');
        });
      }
    }, 2500)

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

      Swal.showLoading();
    
      setTimeout(() => {
        if ( this.error ) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo editar la categoría, intente con otro nombre.'
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Completado',
            text: 'Categoría editada con éxito'
          }).then(() => {
            this.router.navigateByUrl('/backoffice/categories');
          });
        }
      }, 2500)
    }
  }

}
