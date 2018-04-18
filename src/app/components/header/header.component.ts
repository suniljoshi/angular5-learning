import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private username;
  constructor(private _authserv: AuthService, private route:ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    this.username =  this._authserv.getCookie('username');
    console.log(this._authserv.getCookie('username'))
    if(this.username == ''){
     // alert('session expired please login again.!')
      this.router.navigate(['login']);
    }

  }
    
}
