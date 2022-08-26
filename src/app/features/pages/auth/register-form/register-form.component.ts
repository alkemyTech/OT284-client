import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public registerForm!: FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(){
    
    this.registerForm = this.formBuilder.group({
      name: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6),
        Validators.pattern(/(?=.[A-Za-z])/),
        Validators.pattern(/(?=.[0-9])/),
        Validators.pattern(/(?=.[@$!%#?&])/)
      ]),
      confirm_password: new FormControl(null,[Validators.required,Validators.minLength(6),
        Validators.pattern(/(?=.[A-Za-z])/),
        Validators.pattern(/(?=.[0-9])/),
        Validators.pattern(/(?=.[@$!%#?&])/)
      ])
    },
    {
      validators: this.mustMatch('password','confirm_password')
    } as AbstractControlOptions
    );
  }

  get f(){
    return this.registerForm.controls;
  }

  mustMatch(controlName: string, controlNameMatching: string){
    return(formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[controlNameMatching];

      if(matchingControl.errors && !matchingControl.errors.mustMatch){
        return
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch:true});
      }
      else{
        matchingControl.setErrors(null);
      }

      return;
    }
  }

  register(form: any){
    console.log(form.value);
    const {name,email,password} = form.value;
    this.authService.registerFirebase(email,password)
    .then( response => {
      console.log(response);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Te has registrado con éxito',
        showConfirmButton: false,
        timer: 2000
      }).finally(() => {
        this.router.navigate(['/login']);
      })

    })
    .catch( error => console.error(`error ${error}`));
    
  }

}
