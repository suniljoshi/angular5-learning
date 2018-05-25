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

   
  it('Userlist array length should be "2" defualt', () => {
   let service = new LogincommonService();
   service.getUsersList().subscribe(
     response => {
            expect(response.length).toEqual(2);        
     }); 
  }));
   
   
   it('Update Userlist array and after that length should be "3', () => {
   let service = new LogincommonService();
   
   service.getUsersList().subscribe(
     response => {
           response.push({
             username: 'sunil joshi',
             password: 'demo',
             email: 'dummy@test.com'
         })
            expect(response.length).toEqual(3);        
     }); 
  }));
   
   
   it("Update userlist array first username should be 'sunil joshi'", () => {
   let service = new LogincommonService();
   service.getUsersList().subscribe(
     response => {
            expect(response[0].username).toEqual('admin');        
     }); 
  }));

});
