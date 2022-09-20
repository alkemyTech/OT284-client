import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const authServiceMock = jasmine.createSpyObj('AuthService',{
    userslastlogin: () => of({}) 
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: AuthService, useValue: authServiceMock}]
    });
    service = TestBed.inject(AuthService);
  });

  it('Debe existir el servicio', () => {
    expect(service).toBeTruthy();
  });

  // it('Login Firebase exitoso.', () => {

  //   const mockDataLogin = {email: 'maxi@gmail.com', password: 'Maxiasd123$'};

  //   expect(localStorage.getItem('uid')).toBeTruthy();

  // });


});
