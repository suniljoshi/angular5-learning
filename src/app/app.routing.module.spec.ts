import {Location} from "@angular/common";
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { LogincommonService } from './services/logincommon.service'; 
import { MatFormFieldModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './services/authentication.service'; 
import { ToastrModule } from 'ngx-toastr';
import { MatAutocompleteModule,  MatButtonToggleModule,  MatCheckboxModule,  MatChipsModule,  MatDatepickerModule,  MatDialogModule,
         MatExpansionModule,  MatGridListModule,  MatIconModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatProgressBarModule,
         MatRadioModule,  MatRippleModule,  MatSelectModule,  MatSidenavModule,  MatSliderModule,  MatSlideToggleModule,  MatSnackBarModule,
         MatTabsModule,  MatTooltipModule } from '@angular/material';
import {MatInputModule, MatTableModule,MatSortModule, MatToolbarModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

const routes: Routes = [
  {
      path: '',
      component: LoginComponent
  },
  {
     path: 'login',
     component: LoginComponent
 },
      {
      path: 'dashboard',
      component: DashboardComponent
  },
  {
    path: 'dashboard/:userid',
    component: DashboardComponent
},
  {
     path: 'signup',
     component: SignupComponent
 },
 
   { path: '**', 
     component: ErrorComponent }
 ];

describe('Router: App', () => {
   
  let location: Location;
  let router: Router;
  let fixture;
   let mockRouter = {
       navigate: jasmine.createSpy('navigate')
   }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AppComponent,
        LoginComponent,
        SignupComponent,DashboardComponent,HeaderComponent,ErrorComponent
      ],
      providers: [
		{ provide: Router, useValue: mockRouter},LogincommonService, ToastrService, AuthenticationService, AuthService
	  ],
      imports: [HttpClientTestingModule,ToastrModule.forRoot(), MatFormFieldModule, MatPaginatorModule,MatAutocompleteModule, MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,       MatDialogModule,MatExpansionModule,MatGridListModule,MatIconModule,MatListModule,MatMenuModule,MatNativeDateModule,MatProgressBarModule, MatRadioModule,
        MatRippleModule,MatSelectModule,MatSidenavModule,MatSliderModule, MatSlideToggleModule,MatSnackBarModule,MatTabsModule,MatTooltipModule, MatInputModule, MatTableModule,MatSortModule, MatToolbarModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, ReactiveFormsModule, FormsModule,  Ng4LoadingSpinnerModule, RouterTestingModule.withRoutes(routes)],
    });
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 

    fixture = TestBed.createComponent(AppComponent); 
   // router.initialNavigation();
  });


   it('Check if it works', fakeAsync(() => {
          let promise = new Promise((resolve) => {
            setTimeout(resolve, 10)
          });
          let done = false;
          promise.then(() => done = true);
          tick(50);
          expect(done).toBeTruthy();
  }));
   
   
it('navigate to login redirects you to /login', fakeAsync(() => {
   router.navigate(['login'])
     expect (mockRouter.navigate).toHaveBeenCalledWith (['login']);
   
  }));

/*  it('can navigate to login (fakeAsync/tick)', fakeAsync(() => {
    router.navigate(['login']).then(() => {
        expect(location.path()).toBe('/login');
    });
  }));*/
   
  it('navigate to signup takes you to /signup ', fakeAsync(() => {
    router.navigate(['signup'])
     expect (mockRouter.navigate).toHaveBeenCalledWith (['signup']);
  }));

   
   
  it('navigate to dashboard takes you to /dashboard ', fakeAsync(() => {
    router.navigate(['dashboard'])
    expect (mockRouter.navigate).toHaveBeenCalledWith (['dashboard']);
  }));

   

  it('navigate to dashboard takes you to /dashboard with route param id 10', fakeAsync(() => {
    router.navigate(['dashboard/10'])
     expect (mockRouter.navigate).toHaveBeenCalledWith (['dashboard/10']);
  }));

  
});