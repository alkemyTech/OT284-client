import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterTestingModule} from '@angular/router/testing';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  const authServiceMock = jasmine.createSpyObj('AuthService',{
    userslastlogin: () => of({}) 
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule,ReactiveFormsModule,RouterTestingModule.withRoutes([])],
      declarations: [ LoginFormComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario invalido, falta ingresar password', () => {
    const app = fixture.componentInstance;
    const email = app.loginForm.controls['email'];
    email.setValue('maxi@gmail.com')
    expect(app.loginForm.invalid).toBeTruthy();
  });

  it('Formulario invalido, falta ingresar email', () => {
    const app = fixture.componentInstance;
    const password = app.loginForm.controls['password'];
    password.setValue('Maxiasd123$');
    expect(app.loginForm.invalid).toBeTruthy();
  });

  it('Formulario valido, se puede hacer submit', () => {
    const app = fixture.componentInstance;
    const email = app.loginForm.controls['email'];
    email.setValue('maxi@gmail.com')
    const password = app.loginForm.controls['password'];
    password.setValue('Maxiasd123$');
    expect(app.loginForm.valid).toBeTruthy();
  });


});
