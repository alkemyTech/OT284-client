import { TestBed } from '@angular/core/testing';

import { NewsMembersService } from './news-members.service';

describe('NewsMembersService', () => {
  let service: NewsMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
