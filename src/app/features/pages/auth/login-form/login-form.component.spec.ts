import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { async, of } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { RouterTestingModule } from "@angular/router/testing";

import { LoginFormComponent } from "./login-form.component";
import { UserCredential } from "@angular/fire/auth";

const mockResponseLogin = {
  user: {
    uid: "CsOYbYtcOkR25jZxJKW5Knd5Vq13",
    email: "maxi@gmail.com",
    emailVerified: false,
    isAnonymous: false,
    providerData: [
      {
        providerId: "password",
        uid: "maxi@gmail.com",
        displayName: null,
        email: "maxi@gmail.com",
        phoneNumber: null,
        photoURL: null,
      },
    ],
    stsTokenManager: {
      refreshToken:
        "AOEOula1VaWUWmcvEHOVdtKB9RlXwWncb7PXB3bSuCWlz8TAorq1MFKZ-d0RVThGPBF8pPVMHN2aeRQ8Jpm2iV4hbp19GsiygDH9vgUM0sRij8BAEVVIf5fejfYSPC9lF9CdZNgx45CKBpCzWrGaCL_PBnrXH8z8BuzbJIU-sBzbHiV4-DZ1p-j7XVQY2RzkOdQUw5G5PKcr",
      accessToken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxZTZjMGM2YjRlMzA5NTI0N2MwNjgwMDAwZTFiNDMxODIzODZkNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vb3QyODQtZjM4NmYiLCJhdWQiOiJvdDI4NC1mMzg2ZiIsImF1dGhfdGltZSI6MTY2Mzc4NzUwNiwidXNlcl9pZCI6IkNzT1liWXRjT2tSMjVqWnhKS1c1S25kNVZxMTMiLCJzdWIiOiJDc09ZYll0Y09rUjI1alp4SktXNUtuZDVWcTEzIiwiaWF0IjoxNjYzNzg3NTA2LCJleHAiOjE2NjM3OTExMDYsImVtYWlsIjoibWF4aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWF4aUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.UN3Lx7hVm8LyTfumsIilf6aTMRsjBy94AMtEz4fjbn0y5rfQpouG3VFX76dAYgsM71Hkp5qTEyx0FzMJoqsXsOBSD3khytklZG1BVjws5mKMlHVpAM3sOErPx21MnNfWuJhG-dyACsj7UwjKJeAuPqEXo0LOuW4mfBq817aYL5aB8SmuD0r4XLxl2apO3aIn4XaKQc0f_wAgE2EjRKO243BD0mZraOuNH30uPgdD8ZfKqvmm53ss2qLddcLtx8WvEH5sLWZS0olkBXIgLihukkmR2wgbtmN77TZAV50XwHArHvD7SQLO8erI0JaiJNk0-UlU_JmBie0R45OYPPvTow",
      expirationTime: 1663791107926,
    },
    createdAt: "1663010014916",
    lastLoginAt: "1663787506500",
    apiKey: "AIzaSyBB3Zw3cach_-XMeNDr-ZTvu6fXVrm6-Tg",
    appName: "[DEFAULT]",
  },
  providerId: null,
  _tokenResponse: {
    kind: "identitytoolkit#VerifyPasswordResponse",
    localId: "CsOYbYtcOkR25jZxJKW5Knd5Vq13",
    email: "maxi@gmail.com",
    displayName: "",
    idToken:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxZTZjMGM2YjRlMzA5NTI0N2MwNjgwMDAwZTFiNDMxODIzODZkNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vb3QyODQtZjM4NmYiLCJhdWQiOiJvdDI4NC1mMzg2ZiIsImF1dGhfdGltZSI6MTY2Mzc4NzUwNiwidXNlcl9pZCI6IkNzT1liWXRjT2tSMjVqWnhKS1c1S25kNVZxMTMiLCJzdWIiOiJDc09ZYll0Y09rUjI1alp4SktXNUtuZDVWcTEzIiwiaWF0IjoxNjYzNzg3NTA2LCJleHAiOjE2NjM3OTExMDYsImVtYWlsIjoibWF4aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWF4aUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.UN3Lx7hVm8LyTfumsIilf6aTMRsjBy94AMtEz4fjbn0y5rfQpouG3VFX76dAYgsM71Hkp5qTEyx0FzMJoqsXsOBSD3khytklZG1BVjws5mKMlHVpAM3sOErPx21MnNfWuJhG-dyACsj7UwjKJeAuPqEXo0LOuW4mfBq817aYL5aB8SmuD0r4XLxl2apO3aIn4XaKQc0f_wAgE2EjRKO243BD0mZraOuNH30uPgdD8ZfKqvmm53ss2qLddcLtx8WvEH5sLWZS0olkBXIgLihukkmR2wgbtmN77TZAV50XwHArHvD7SQLO8erI0JaiJNk0-UlU_JmBie0R45OYPPvTow",
    registered: true,
    refreshToken:
      "AOEOula1VaWUWmcvEHOVdtKB9RlXwWncb7PXB3bSuCWlz8TAorq1MFKZ-d0RVThGPBF8pPVMHN2aeRQ8Jpm2iV4hbp19GsiygDH9vgUM0sRij8BAEVVIf5fejfYSPC9lF9CdZNgx45CKBpCzWrGaCL_PBnrXH8z8BuzbJIU-sBzbHiV4-DZ1p-j7XVQY2RzkOdQUw5G5PKcr",
    expiresIn: "3600",
  },
  operationType: "signIn",
};

const mockedAuthService : {
  loginFirebase: () => Promise<any>
}= {
  loginFirebase: () => new Promise(() => mockResponseLogin)
};

describe("LoginFormComponent", () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  // const authServiceMock = jasmine.createSpyObj("AuthService", {
  //   loginFirebase: () => Promise<UserCredential>
  // });

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

  it("Formulario invalido, falta ingresar password", () => {
    const app = fixture.componentInstance;
    const email = app.loginForm.controls["email"];
    email.setValue("maxi@gmail.com");
    expect(app.loginForm.invalid).toBeTruthy();
  });

  it("Formulario invalido, falta ingresar email", () => {
    const app = fixture.componentInstance;
    const password = app.loginForm.controls["password"];
    password.setValue("Maxiasd123$");
    expect(app.loginForm.invalid).toBeTruthy();
  });

  it("Formulario valido, se puede hacer submit", () => {
    const app = fixture.componentInstance;
    const email = app.loginForm.controls["email"];
    email.setValue("maxi@gmail.com");
    const password = app.loginForm.controls["password"];
    password.setValue("Maxiasd123$");
    expect(app.loginForm.valid).toBeTruthy();
  });

  it('Login Firebase exitoso.', () => {
    const app = fixture.componentInstance;
    const email = app.loginForm.controls["email"];
    email.setValue("maxi@gmail.com");
    const password = app.loginForm.controls["password"];
    password.setValue("Maxiasd123$");

    const loginFirebase = spyOn(mockedAuthService, 'loginFirebase');
    loginFirebase.and.returnValue(new Promise(() => mockResponseLogin))

    app.login(app.loginForm);
    expect(mockedAuthService.loginFirebase).toHaveBeenCalled();
  });
});
