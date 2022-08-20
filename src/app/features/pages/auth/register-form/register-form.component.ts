import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(){
    this.registerForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(2)]),
      surname: new FormControl('',[Validators.required,Validators.minLength(2)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.pattern('^([a-zA-Z]*)')])
      //confirm_password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[a-zA-Z])(?=.*\d)(?=.[#$@!%&?¡^|~){6,32}$")]),
    })
  }

  register(form: any){
    console.log(form.value);
  }

}
