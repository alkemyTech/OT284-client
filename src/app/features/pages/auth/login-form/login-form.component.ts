import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  
  public loginForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router: Router) { }

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
    
    this.authService.loginFirebase(email,password)
    .then(response => {
      console.log(response);
      localStorage.setItem('uid', response.user.uid);
      this.router.navigate(['']);
    })
    .catch(error => {
      console.error(`error : ${error}`);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La cuenta ingresada no existe'
      })
    });
  }

}
