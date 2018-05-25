import { async, ComponentFixture, fakeAsync, TestBed, getTestBed, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { SignupComponent } from '../signup/signup.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { ErrorComponent } from '../error/error.component';
import { Router, Routes } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LogincommonService } from '../../services/logincommon.service'; 
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../services/authentication.service'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule,  MatButtonToggleModule,  MatCheckboxModule,  MatChipsModule,  MatDatepickerModule,  MatDialogModule,
         MatExpansionModule,  MatGridListModule,  MatIconModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatProgressBarModule,
         MatRadioModule,  MatRippleModule,  MatSelectModule,  MatSidenavModule,  MatSliderModule,  MatSlideToggleModule,  MatSnackBarModule,
         MatTabsModule,  MatTooltipModule } from '@angular/material';
import {MatInputModule, MatTableModule,MatSortModule, MatToolbarModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';


const routes: Routes = [
  {
     path: 'login',
     component: LoginComponent
 },
  {
     path: 'signup',
     component: SignupComponent
 }
 ];


describe('LoginComponent', () => {
  let component: LoginComponent;
     let router: Router;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter = {
       navigate: jasmine.createSpy('navigate')
   }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
       imports:[MatFormFieldModule, MatPaginatorModule,MatAutocompleteModule, MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,       MatDialogModule,MatExpansionModule,MatGridListModule,MatIconModule,MatListModule,MatMenuModule,MatNativeDateModule,MatProgressBarModule, MatRadioModule,
        MatRippleModule,MatSelectModule,MatSidenavModule,MatSliderModule, MatSlideToggleModule,MatSnackBarModule,MatTabsModule,MatTooltipModule, MatInputModule, MatTableModule,MatSortModule, MatToolbarModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, ReactiveFormsModule,FormsModule,HttpClientTestingModule,Ng4LoadingSpinnerModule,ToastrModule.forRoot(), RouterTestingModule.withRoutes(routes)],
       providers:[LogincommonService,AuthenticationService,Ng4LoadingSpinnerService,ToastrService, AuthService, { provide: Router, useValue: mockRouter}],
       declarations: [ LoginComponent, SignupComponent, DashboardComponent, HeaderComponent, ErrorComponent]
    }).compileComponents();
      router = TestBed.get(Router);
       fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
   
   it('Set and get cookie with test the output username', () => {
      
    component.createCookie('login','sunil',10, 'sunil joshi');
    const auth = getTestBed().get(AuthService);
    let result = auth.getCookie('username')
    expect(result).toBe('sunil joshi');
      
  });
   
   
   it('Test logindata var information with get and set', () => {
      
   let userdatablank = {username:'', password:''};
    expect(component.logindata).toEqual(userdatablank);
      
    let userdata = {username:'luv',password:'luv'};
    component.logindata = userdata;
    expect(component.logindata).toEqual(userdata);
      
  });
   
   
/* it('Set login data and test login function', fakeAsync(() =>  {
      
    let userdata = {username:'luv',
                    password:'luv'};
    component.logindata = userdata;
    fixture.detectChanges();
    component.login()
    tick(5000);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['dashboard']);
    
  });*/
    
   it('Navigate to signup page via function signup', fakeAsync(() =>  {
     component.signup()
     tick(500);
     expect(mockRouter.navigate).toHaveBeenCalledWith(['signup']);
    
  }));
   
   it('Login page title', () => {
     let title = fixture.debugElement.nativeElement.querySelector('h2');
     let valueofTitle = title.innerText;
      expect(valueofTitle).toEqual('User Login');
   });
   
   
   it('check value of login button', async(() => {
     let button = fixture.debugElement.nativeElement.querySelector('.login-button');
     fixture.detectChanges();
      expect(button.value).toEqual('Login');
   }));
   
   
   
   it('check on login button function is calling', () => {
       const loginBtn = fixture.debugElement.query(By.css('.login-button'));
      console.log(loginBtn)
        spyOn(component, 'login').and.callThrough();
        const event = {
            target : {
                parentElement: loginBtn.parent.nativeElement
            }
        };
       loginBtn.triggerEventHandler('click', event);
        expect(component.login).toHaveBeenCalled();

   });
   
  
});
