import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { MemberFormComponent } from './member-form.component';
import { HttpClientModule } from '@angular/common/http';

describe('MemberFormComponent', () => {
  let component: MemberFormComponent;
  let fixture: ComponentFixture<MemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CKEditorModule, HttpClientModule],
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

  it('should not call console.log when form is invalid', () => {
    let fnc = spyOn(console, 'log');
    

    expect(component.form.valid).toBeFalsy();
    expect(fnc).not.toHaveBeenCalled();
  });

  it('should call console.log when form in valid', () => {
    let fnc = spyOn(console, 'log');
    let form = fixture.debugElement.query(By.css('form'));
    const data = {
      name: 'test',
      image: 'data:image/png;base64,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',
      description: '<p>test</p>',
      facebookUrl: 'https://www.facebook.com/zuck/',
      linkedinUrl: 'https://www.linkedin.com/in/mark-zuckerberg-618bba58/'
    }
  
    component.form.patchValue(data);
    fixture.detectChanges();
    form.triggerEventHandler('ngSubmit', null);

    expect(component.form.valid).toBeTruthy();
    expect(fnc).toHaveBeenCalled();
  });

});
