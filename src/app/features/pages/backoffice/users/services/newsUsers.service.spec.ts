import { TestBed } from "@angular/core/testing";

import { NewsUsersService } from "./newsUsers.service";

describe("NewsUsersService", () => {
  let service: NewsUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsUsersService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
