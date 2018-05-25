import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';
import { RouteGuardForViewDashboard } from './services/routeguard.service';
import { LiveComponent } from './components/liveapi/live.component';

const routes: Routes = [
 {
     path: '',
     component: LoginComponent
 },
 {
    path: 'login',
    component: LoginComponent,
},
   {
     path: 'live',
     component: LiveComponent,
     canActivate: [RouteGuardForViewDashboard]
   },
     {
     path: 'dashboard',
     component: DashboardComponent,
     canActivate: [RouteGuardForViewDashboard]
 },
 {
    path: 'signup',
    component: SignupComponent
},
  { path: '**', 
    component: ErrorComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
