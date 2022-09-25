import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, MatDialogModule],
      declarations: [ ContactFormComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  const fillForm = () => {
    setFieldValue( 'es', "name");
    setFieldValue( '', "email");
    setFieldValue( '', "phone");
    setFieldValue( '', "message");
  }

  it('should not submit on form error', () => {
    fillForm()
    fixture.detectChanges() 
    let submitBtn = fixture.debugElement.query(By.css('button'))
    /* let form = fixture.debugElement.nativeElement.querySelector('#container') */
    expect(submitBtn.nativeElement.getAttribute('disabled')).toEqual('');
  });

  it('invalid form when is empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('valid form when fields are correctly loaded ', () => {
    setFieldValue( 'Emilio', "name");
    setFieldValue( 'emilio@gmail.com', "email");
    setFieldValue( '12345678', "phone");
    setFieldValue( 'Hola', "message");
    expect(component.contactForm.valid).toBeTruthy();
  });
  it('submit button not disable when fields are correctly loaded ', () => {
    setFieldValue( 'Emilio', "name");
    setFieldValue( 'emilio@gmail.com', "email");
    setFieldValue( '12345678', "phone");
    setFieldValue( 'Hola', "message");
    let submitBtn = fixture.debugElement.query(By.css('button'))
    expect(submitBtn.nativeElement.disable).toBeFalsy();
  });

  function setFieldValue(value: string, input: any) {
    const ctrl = component.contactForm.get(input)
    ctrl?.setValue(value)
  }
});
