import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const authServiceMock = jasmine.createSpyObj('AuthService',{
    userslastlogin: () => of({}) 
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock}
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach( () => {
    httpMock.verify();
  });

  it('Debe existir el servicio', () => {
    expect(service).toBeTruthy();
  });

});
