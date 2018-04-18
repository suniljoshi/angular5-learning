import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; 
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LogincommonService } from '../../services/logincommon.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
   public users;
  public logindata = {username:'',
                   password:''};
    
    public myform: FormGroup;
    public username: FormControl;
    public password: FormControl;

    
    
  constructor(private _usersdata: LogincommonService, private router: Router) { }  
  ngOnInit() {
    document.cookie.split(";").forEach(function(c) {
       document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    this.createFormControls();
    this.createForm();
    this._usersdata.usersList.subscribe(res => {
      this.users = res;
      console.log(res)
   });

  }
     createFormControls() {
            this.username = new FormControl('', Validators.required);
            this.password = new FormControl('', Validators.required);
  }

  createForm() {
            this.myform = new FormGroup({
              username: this.username,
              password: this.password
    });
  }
    login(){
      //  this.spinnerService.show();
       let username = this.logindata.username;
       let password = this.logindata.password;

       var loginstatus = this.users.some(function(user){
         console.log(user);
        return user.username == username && user.password == password;
       });


       setTimeout(()=>{ 
          //this.spinnerService.hide();
          
          if(loginstatus){
              if(username == 'admin')
                  this.createCookie("role", "admin", 1, username)
                  else
                      this.createCookie("role", "user", 1, username)
                      this.router.navigate(['dashboard']);
          }

        else alert('Username or password incorrect..!')
              
       },1000)
        
    }

    createCookie(name,value,minutes, username) {
      console.log(username)
      if (minutes) {
          var date = new Date();
          date.setTime(date.getTime()+(minutes*60*1000));
          var expires = "; expires="+date.toUTCString();
      } else {
          var expires = "";
      }
      document.cookie = "username="+username+";"+name+"="+value+expires+"; path=/";
  }
  
    signup(){
      this.router.navigate(['signup']);
    }
}
