import { HttpClientModule, HttpEvent, HttpEventType ,} from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Form, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ContactService } from 'src/app/core/services/contact.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ContactFormComponent } from './contact-form.component';
import { of } from 'rxjs';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let messageResponse : string
  let contactFormSpy: any
  const mockedContactService : {
    httpPostContact: () => Promise<any>
  }= {
    httpPostContact: () => new Promise(() => mockResponse)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, MatDialogModule, HttpClientTestingModule],
      declarations: [ ContactFormComponent],
      providers: [ContactService]
    })
    .compileComponents();
  });

  beforeEach(() => {
   
    const contactService = jasmine.createSpyObj(mockedContactService, ['sendMessage']);
    contactFormSpy = contactService.sendMessage.and.returnValue(of(mockResponse.message));
  
    TestBed.configureTestingModule({
      declarations: [ContactFormComponent],
      providers: [{provide: ContactService, useValue: contactService}]
    });
  
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    messageResponse = fixture.nativeElement.messageResponse;
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
    setFieldValue( 'Hola necesito contactarme con la ONG', "message");
    let submitBtn = fixture.debugElement.query(By.css('button'))
    expect(submitBtn.nativeElement.disable).toBeFalsy();
  });

  function setFieldValue(value: string, input: any) {
    const ctrl = component.contactForm.get(input)
    ctrl?.setValue(value)
  }

  it('Contact message sent successful', () => {
    setFieldValue( 'Emilio', "name");
    setFieldValue( 'emilio@gmail.com', "email");
    setFieldValue( '12345678', "phone");
    setFieldValue( 'Hola', "message");

    spyOn(component.messageResponse, 'emit');
   
    let button = fixture.nativeElement.querySelector('.button');
    expect(button.disable).toBeFalsy();
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    
    expect(contactFormSpy.sendMessage).toHaveBeenCalled()
    expect(component.messageResponse.emit(contactFormSpy)).toHaveBeenCalledWith(mockResponse.message);

  });

  const mockResponse ={
    "success": true,
    "data": [
      {
        "id": 0,
        "name": "string",
        "email": "string",
        "phone": "string",
        "message": "string",
        "deleted_at": "2022-09-25T15:28:02.721Z",
        "created_at": "2022-09-25T15:28:02.721Z",
        "updated_at": "2022-09-25T15:28:02.721Z"
      }
    ],
    "message": "Message sent success"
  }
});

