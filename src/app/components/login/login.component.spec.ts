import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
       imports:[ReactiveFormsModule,FormsModule,RouterTestingModule,HttpClientTestingModule,Ng4LoadingSpinnerModule,ToastrModule.forRoot()],
       providers:[LogincommonService,AuthenticationService,Ng4LoadingSpinnerService,ToastrService],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
