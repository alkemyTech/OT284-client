import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactFormComponent ]
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
    setFieldValue( '', "name");
    setFieldValue( '', "email");
    setFieldValue( '', "phone");
    setFieldValue( '', "message");
  }

  it('should not submit on form error', () => {
    fillForm()
    fixture.debugElement
   /*  fixture.debugElement.nativeElement.querySelector('#form').triggerEventHandler('submit', {});

    expect(signupService.signup).toThrowError */
  });

  function setFieldValue(value: string, input: any) {
    const ctrl = component.contactForm.get(input)
    ctrl?.setValue(value)
  }
});
