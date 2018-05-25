import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource,  MatSort, MatPaginator } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username;
  constructor(private toastr: ToastrService, private _authserv: AuthService, private route:ActivatedRoute, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { 
  }

  ngOnInit() {
    this.username =  this._authserv.getCookie('username');
    console.log(this._authserv.getCookie('username'))
    if(this.username == ''){
      this.toastr.error('Session Expired.!', 'Please login again..!');
      this.router.navigate(['login']);
    }

  }
   
 /*  gotoLiveapis(){
    //  this.router.navigate(['live']);
   }*/
    
}
