import { TestBed } from '@angular/core/testing';

import { SlidesServiceService } from './slides-service.service';

describe('SlidesServiceService', () => {
  let service: SlidesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlidesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
