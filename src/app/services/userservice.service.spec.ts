import { inject, tick, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';

import { UserserviceService } from './userservice.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { JwtInterceptor } from '../interceptor/jwt.interceptor';
import { fakeBackendProvider } from '../interceptor/fake-backend';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../modals/user';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs/observable/of';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import 'rxjs/Rx';
import { HeaderComponent } from '../components/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HttpModule } from '@angular/http';
import { constantData } from "../constants/constants";

//export class UserServiceShouldnotTest {

//  run() {

describe('UserserviceService', () => {
  var userService;
  let homeComponent;
  let fixture;
  let element;
  let test = constantData.testing;
  

  beforeEach(async(() => {

    if(test){
      console.log('Setting static data')
            localStorage.setItem('currentUser', JSON.stringify(constantData.testToken));
            localStorage.setItem('users', JSON.stringify(constantData.SetUsers));
    }
   

    TestBed.configureTestingModule({
       imports:[HttpClientTestingModule,HttpModule, RouterTestingModule,ToastrModule.forRoot(),Ng4LoadingSpinnerModule.forRoot()],

       providers: [AuthService,ToastrService,UserserviceService, {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
       }, fakeBackendProvider],
       declarations: [DashboardComponent,HeaderComponent]
     }).compileComponents();
    }));


    beforeEach(inject([UserserviceService], s => {
      userService = s;
      fixture = TestBed.createComponent(DashboardComponent);
      homeComponent = fixture.componentInstance;
      element = fixture.nativeElement;
    }));

     
  it('should be created', inject([UserserviceService], (service: UserserviceService) => {
    expect(service).toBeTruthy();
  }));
   


it("should call getUsers and return list of users", async(() => {
 const userService = getTestBed().get(UserserviceService);
  userService.getAll().subscribe(
    users => {
      console.log(users)
      expect(users.length).toEqual(10);
    }
  ); 
  
}));

it("Should return 1 result get user by id", async(() => {
  const userService = getTestBed().get(UserserviceService);
   userService.getById(4).subscribe(
     response => {
       console.log(response)
       expect(response.username).toEqual('gmail');
     }
   ); 
   
 }));



 it("Should Delete a result and after delete should come result should come 9 ", async(() => {
  const userService = getTestBed().get(UserserviceService);
   userService.delete(5).subscribe(
     response => {
       console.log(response)
       expect(response).toEqual(null);
       userService.getAll().subscribe(
        users => {
          console.log(users)
          expect(users.length).toEqual(9);
        }
      ); 
     }
   ); 
   
 }));

 it("Update a username luv to luvmathur it should come truthy", async(() => {
    let userdata = {
      username:'luvmathur',
      password:'luv',
      email:'luvmathur@intimetec.com',
      id:4
    }
  const userService = getTestBed().get(UserserviceService);
   userService.update(userdata).subscribe(
     response => {
       console.log(response)
       expect(response.username).toEqual('luvmathur');
     }
   ); 
   
 }));
 
 
});
     


