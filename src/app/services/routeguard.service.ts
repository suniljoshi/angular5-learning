import { Injectable } from '@angular/core';
import { UserserviceService } from "./userservice.service";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()

export class RouteGuardForViewDashboard implements CanActivate { 
  constructor(private userService: UserserviceService, private router: Router) {}; 
   
  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (this.userService.isLoggedIn()) { 
      return true
    } else {
      window.alert("Please login again"); 
      this.router.navigate(['login']);
      return false
    }
  }
}