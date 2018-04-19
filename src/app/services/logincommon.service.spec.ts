import { TestBed, inject } from '@angular/core/testing';

import { LogincommonService } from './logincommon.service';

describe('LogincommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogincommonService]
    });
  });

  it('Check if login service is Working or not', inject([LogincommonService], (service: LogincommonService) => {
    expect(service).toBeTruthy();
  }));

  it('Should return userlist array', () => {
    let service = new LogincommonService();
    expect(service.getUsersList()).toBeTruthy();
  });


});
