import { TestBed } from '@angular/core/testing';

import { PrivateApiInterceptor } from './private-api.interceptor';

describe('PrivateApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PrivateApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PrivateApiInterceptor = TestBed.inject(PrivateApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
