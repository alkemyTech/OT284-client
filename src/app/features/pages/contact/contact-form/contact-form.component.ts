
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from 'src/app/core/services/contact.service';
import { MatAlertErrorComponent } from 'src/app/shared/components/mat-alert-error/mat-alert-error.component';
import { contactDTO } from '../../../../shared/interfaces/contactDTO';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  @Output() messageResponse = new EventEmitter<{ messageResponse: string }>();

  constructor(private formBuilder: FormBuilder, private contactService: ContactService,
    public dialog: MatDialog) {
  
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
        this.resetForm()
      },
      (err)=>{
        this.dialog
      .open(MatAlertErrorComponent, {
        data: {text:`error al cargar mensaje `, message: err.message},
      })
        this.messageResponse.emit({ messageResponse: err });
        this.resetForm()
      }
    )
    
  }

  resetForm() {
    this.contactForm.reset();
}

}
