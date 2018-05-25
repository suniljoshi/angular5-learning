import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SignupComponent } from './signup.component';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LogincommonService } from '../../services/logincommon.service'; 
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserserviceService } from '../../services/userservice.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
       imports:[ReactiveFormsModule,FormsModule, RouterTestingModule,HttpClientTestingModule,Ng4LoadingSpinnerModule,ToastrModule.forRoot()],
       providers:[LogincommonService,UserserviceService,Ng4LoadingSpinnerService,ToastrService],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
      
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    
  });
   

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
  it('form should be invalid defualt', () => {
    expect(component.myform.valid).toBeFalsy();
  });
   
   
   it('Signup page title shoulb be "Sign up"', () => {
      
     let title = fixture.debugElement.nativeElement.querySelector('h2');
     let valueofTitle = title.innerText;
      expect(valueofTitle).toEqual('User Signup');
      
   });
   
   
   it('Buttons value of login and signup ', () => {
      
     let signupBtn = fixture.debugElement.nativeElement.querySelector('.login-button');
     let loginBtn  = fixture.debugElement.nativeElement.querySelector('.signup-button');

      expect(loginBtn.value).toEqual('Sign Up');
      expect(signupBtn.value).toEqual('Go to login page');
      
   });
   
   
   it('Login and signup function event test on buttons ', () => {
      
      let loginBtn = fixture.debugElement.query(By.css('.login-button'));
      let signupBtn = fixture.debugElement.query(By.css('.signup-button'));
      
        spyOn(component, 'login').and.callThrough();
        spyOn(component, 'signup').and.callThrough();
      

       loginBtn.triggerEventHandler('click', '');
       signupBtn.triggerEventHandler('click', '');
      
        expect(component.login).toHaveBeenCalled();
        expect(component.signup).toHaveBeenCalled();

      
   });
   
    it('Test sign button should disable default', () => {
     let signupBtn = fixture.debugElement.nativeElement.querySelector('.signup-button');
     expect(signupBtn.disabled).toBeTruthy(); 
   });
   
      
    it('Sign up button should be enable after fill complete data', () => { 
       
     let formdata =  {username:'xyz',
                      password:'abc',
                      email:'aba@gmail.com',
                      id: null};
       
     component.userdata = formdata;
     component.signupFrm.repassword = 'abc';
     fixture.detectChanges();
     let signupBtn = fixture.debugElement.nativeElement.querySelector('.signup-button');
     expect(signupBtn.disabled).toBeFalsy();
       
   });

  it('email field validation test', () => {
    let errors = {};
    let email = component.myform.controls['email'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("demo");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });
   
   
});
