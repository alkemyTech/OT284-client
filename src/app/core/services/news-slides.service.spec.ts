import { TestBed } from '@angular/core/testing';

import { NewsSlidesService } from './news-slides.service';

describe('NewsSlidesService', () => {
  let service: NewsSlidesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsSlidesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
