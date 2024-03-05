import { TestBed } from '@angular/core/testing';

import { UserAuthenticateService } from './user-authenticate.service';

describe('UserAuthenticateService', () => {
  let service: UserAuthenticateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthenticateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
