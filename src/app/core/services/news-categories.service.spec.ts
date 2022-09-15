import { TestBed } from '@angular/core/testing';

import { NewsCategoriesService } from './news-categories.service';

describe('NewsCategoriesService', () => {
  let service: NewsCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
