import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { fakeBackendProvider } from './interceptor/fake-backend';
import { AuthenticationService } from './services/authentication.service';
import { UserserviceService } from './services/userservice.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';

import { AuthService } from './services/auth.service'; 
import { LogincommonService } from './services/logincommon.service'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     CommonModule,
     ReactiveFormsModule,
     RouterModule,
     FormsModule,
     HttpClientModule,
     ToastrModule.forRoot(),
     BrowserAnimationsModule,
     Ng4LoadingSpinnerModule.forRoot()
     
  ],
  providers: [AuthService,LogincommonService,AuthenticationService, UserserviceService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
     fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
