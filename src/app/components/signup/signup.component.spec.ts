import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
