import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
   
   
   it("Get cookie function should return '' if i want to get unknown user details ", inject([AuthService], (service: AuthService) => {
    expect(service.getCookie('xyz')).toEqual('');
  }));
});
