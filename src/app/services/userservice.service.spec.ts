import { TestBed, inject } from '@angular/core/testing';

import { UserserviceService } from './userservice.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { JwtInterceptor } from '../interceptor/jwt.interceptor';
import { fakeBackendProvider } from '../interceptor/fake-backend';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../modals/user';
import 'rxjs/Rx';
//import { provide } from '@angular/core';

describe('UserserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports:[HttpClientTestingModule, RouterTestingModule],
       providers: [UserserviceService, {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
       }, fakeBackendProvider]
    });
  });

   
  it('should be created', inject([UserserviceService], (service: UserserviceService) => {
    expect(service).toBeTruthy();
  }));
   
    it('Add user for testing', inject([UserserviceService], (service: UserserviceService) => {
     //  let service = new LogincommonService();
       let userdata = {
                    username:'admin1',
                    password:'admin1',
                    email:'admin@test.com',
                    id:123
                  }
       
     //  return service.create(userdata).subscribe(response => {
       // console.log(response)
   // });
    expect(service.create(userdata)).toBeTruthy(); 
  }));
     it('Get an user by id', inject([UserserviceService], (service: UserserviceService) => {
        expect(service.getById(123)).toBeTruthy();
  }));
   
    it('Get all users', inject([UserserviceService], (service: UserserviceService) => {
       //console.log(service.getAllUsers());
   // http.getAll().subscribe(users => { 
     //  console.log(users); 
    //});
      // console.log(234342423);
       
       //this.http.get('/api/users').then(function(res){
         //                                       console.log(res)
           //
        //let service = new UserserviceService();
    //spyOn(service.c, 'next').and.callThrough()})
       //spyOn(service, 'c$').and.callThrough;

    //service.setC('demo')
        //service.c$.getAll().subscribe(users => {
      //expect(users.length).toBeGreaterThan(0);
      //expect(users).toEqual(dummyUsers);
       expect(service.getAll()).toBeTruthy();
    });
       
       
  }));
     
});