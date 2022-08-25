
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  
      this.contactForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.min(10000000), Validators.max(999999999),Validators.pattern('[0-9]*')]],
        message: ['', [Validators.required]],
        })
  }

  ngOnInit(): void {
  }

  get Name() {
    return this.contactForm.get('name');
  }

  get Email() {
    return this.contactForm.get('email');
  }

  get Phone() {
    return this.contactForm.get('phone');
  }

  get Message() {
    return this.contactForm.get('message');
  }

  onSubmit(event: Event) {
    console.log(this.contactForm.value)
  }

  resetForm() {
    this.contactForm.reset();
}

}
