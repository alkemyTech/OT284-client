import { TestBed } from '@angular/core/testing';

import { NewsHomeService } from './news-home.service';

describe('NewsHomeService', () => {
  let service: NewsHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
