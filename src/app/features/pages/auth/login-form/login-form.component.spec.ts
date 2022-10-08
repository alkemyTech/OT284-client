import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "src/app/core/services/auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { LoginFormComponent } from "./login-form.component";
import { mockResponseLogin } from "./mockResponseLogin";


const mockedAuthService : {
  loginFirebase: () => Promise<any>
}= {
  loginFirebase: () => new Promise(() => mockResponseLogin)
};

describe("LoginFormComponent", () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [LoginFormComponent],
      providers: [{ provide: AuthService, useValue: mockedAuthService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe existir el componente", () => {
    expect(component).toBeTruthy();
  });

  it("1_ Formulario invalido, falta ingresar password.", () => {
    const app = fixture.componentInstance;
    const email = app.loginForm.controls["email"];
    email.setValue("maxi@gmail.com");
    expect(app.loginForm.invalid).toBeTruthy();
  });

  it("2_ Formulario invalido, falta ingresar email.", () => {
    const app = fixture.componentInstance;
    const password = app.loginForm.controls["password"];
    password.setValue("Maxiasd123$");
    expect(app.loginForm.invalid).toBeTruthy();
  });

  it("3_ Formulario invalido, la contraseña no cumple con el pattern.", () => {
    const app = fixture.componentInstance;
    const email = app.loginForm.controls["email"];
    email.setValue("maxi@gmail.com");
    const password = app.loginForm.controls["password"];
    password.setValue("maxiasd123");
    expect(app.loginForm.invalid).toBeTruthy();
  });

  it("4_ Formulario valido, se puede hacer submit.", () => {
    const app = fixture.componentInstance;
    const email = app.loginForm.controls["email"];
    email.setValue("maxi@gmail.com");
    const password = app.loginForm.controls["password"];
    password.setValue("Maxiasd123$");
    expect(app.loginForm.valid).toBeTruthy();
  });

  it('5_ Login Firebase exitoso.', () => {
    const app = fixture.componentInstance;
    const email = app.loginForm.controls["email"];
    email.setValue("maxi@gmail.com");
    const password = app.loginForm.controls["password"];
    password.setValue("Maxiasd123$");
    const response = mockResponseLogin;

    const loginFirebase = spyOn(mockedAuthService, 'loginFirebase');
    loginFirebase.and.returnValue(new Promise(() => mockResponseLogin))
    app.login(app.loginForm);
    

    expect(mockedAuthService.loginFirebase).toHaveBeenCalled();
    expect(response).toEqual(mockResponseLogin);
    
  });

  it('6_ Login Firebase fallido, el usuario ingresado no existe.', async () => {
    const app = fixture.componentInstance;
    const email = app.loginForm.controls["email"];
    email.setValue("maxi48000000@gmail.com");
    const password = app.loginForm.controls["password"];
    password.setValue("Maxiiiiiiasd123$");
    const response = false;

    const loginFirebase = spyOn(mockedAuthService, 'loginFirebase');
    loginFirebase.and.returnValue(new Promise(() => mockResponseLogin))
    app.login(app.loginForm);
    

    expect(mockedAuthService.loginFirebase).toHaveBeenCalled();
    expect(response).toBeFalse();
    
  });
});
