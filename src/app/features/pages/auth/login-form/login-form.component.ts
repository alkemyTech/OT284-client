import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  
  public loginForm!: FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(){

    this.loginForm = this.formBuilder.group({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6),
        Validators.pattern(/(?=.[A-Za-z])/),
        Validators.pattern(/(?=.[0-9])/),
        Validators.pattern(/(?=.[@$!%#?&])/)
      ])
    });

  }

  get f() {
    return this.loginForm.controls;
  }

  login(form: any){
    console.log(form.value);
    const {email,password} = form.value;
    console.log(email,password);
  }

}
