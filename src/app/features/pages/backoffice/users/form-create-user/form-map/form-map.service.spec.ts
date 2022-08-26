import { TestBed } from '@angular/core/testing';

import { FormMapService } from './form-map.service';

describe('FormMapService', () => {
  let service: FormMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
