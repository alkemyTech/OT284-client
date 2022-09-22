import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MemberFormComponent } from './member-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from '../../../../../state/app.state';

describe('MemberFormComponent', () => {
  let component: MemberFormComponent;
  let fixture: ComponentFixture<MemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, CKEditorModule, HttpClientModule, RouterModule.forRoot([]), StoreModule.forRoot(ROOT_REDUCERS)],
      declarations: [ MemberFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let errors: any = {};
    let name = component.form.controls['name'];
    expect(name.valid).toBeFalsy();

    /* name field is required */
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();

    /* set value to name < 4 characters*/
    name.setValue("tes");
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    /* set correct value to name */
    name.setValue("1234");
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minLength']).toBeFalsy();
  })

  it('image field validity', () => {
    let errors: any = {};
    let image = component.form.controls['image'];
    expect(image.valid).toBeFalsy();

    /* image field is required */
    errors = image.errors || {};
    expect(errors['required']).toBeTruthy();
  })

  it('description field validity', () => {
    let errors: any = {};
    let description = component.form.controls['description'];
    expect(description.valid).toBeFalsy();

    /* description field is required */
    errors = description.errors || {};
    expect(errors['required']).toBeTruthy();

    /* set correct value to description */
    description.setValue("abc");
    errors = description.errors || {};
    expect(errors['required']).toBeFalsy();
  })

  it('facebookUrl field validity', () => {
    let errors: any = {};
    let facebookUrl = component.form.controls['facebookUrl'];
    expect(facebookUrl.valid).toBeFalsy();

    /* facebookUrl field is required */
    errors = facebookUrl.errors || {};
    expect(errors['required']).toBeTruthy();

    /* set invalid value to facebookUrl */
    facebookUrl.setValue("test");
    errors = facebookUrl.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    /* set correct value to facebookUrl */
    facebookUrl.setValue("https://www.facebook.com/zuck/");
    errors = facebookUrl.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minLength']).toBeFalsy();
  })

  it('linkedinUrl field validity', () => {
    let errors: any = {};
    let linkedinUrl = component.form.controls['linkedinUrl'];
    expect(linkedinUrl.valid).toBeFalsy();

    /* linkedinUrl field is required */
    errors = linkedinUrl.errors || {};
    expect(errors['required']).toBeTruthy();

    /* set invalid value to linkedinUrl */
    linkedinUrl.setValue("test");
    errors = linkedinUrl.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    /* set correct value to linkedinUrl */
    linkedinUrl.setValue("https://www.linkedin.com/in/mark-zuckerberg-618bba58/");
    errors = linkedinUrl.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minLength']).toBeFalsy();
  })

  it('should call the onSubmit method when form is submitted', () => {
    let form = fixture.debugElement.query(By.css('form'));
    let fnc = spyOn(component, 'onSubmit');

    form.triggerEventHandler('ngSubmit', null);
    expect(fnc).toHaveBeenCalled();
  });

  it('should call editMember when form is valid and member is not undefined', () => {
    const data = {
      id: 858,
      name: "Susana Perez",
      image: "http://ongapi.alkemy.org/storage/9TvHsxwgIt.png",
      description: "<p>Asistente social</p>",
      facebookUrl: "https://www.facebook.com/zuck",
      linkedinUrl: "https://www.linkedin.com/in/mcordero76/",
      deleted_at: null,
      group_id: null
    }
    
    const dataForm = {
      name: "Susana Perez",
      image: "http://ongapi.alkemy.org/storage/9TvHsxwgIt.png",
      description: "<p>Asistente social</p>",
      facebookUrl: "https://www.facebook.com/zuck",
      linkedinUrl: "https://www.linkedin.com/in/mcordero76/",
    }

    component.member = data;
    component.form.patchValue(dataForm);

    let editMember = spyOn(component, 'editMember');
    let form = fixture.debugElement.query(By.css('form'));
  
    component.form.get('image')?.clearValidators();
    component.form.get('image')?.updateValueAndValidity();

    form.triggerEventHandler('ngSubmit', null);

    expect(component.member).not.toBeUndefined();
    expect(component.form.valid).toBeTruthy();
    expect(editMember).toHaveBeenCalled();
  });

});
