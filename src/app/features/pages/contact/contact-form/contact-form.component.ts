
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/core/services/contact.service';
import { contactDTO } from '../../../../shared/interfaces/contactDTO';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  @Output() messageResponse = new EventEmitter<{ messageResponse: string }>();

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) {
  
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

  onSubmit() {
    let contactFormDTO = new contactDTO(this.contactForm.value)
    this.contactService.sendMessage(contactFormDTO).subscribe(
      (data)=>{
        this.messageResponse.emit({ messageResponse: data });
      },
      (err)=>{
        this.messageResponse.emit({ messageResponse: err });
      }
    )
    
  }

  resetForm() {
    this.contactForm.reset();
}

}
