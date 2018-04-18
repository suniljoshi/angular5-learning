import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; 
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LogincommonService } from '../../services/logincommon.service'; 



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

 public users;
  public userdata = {
                    username:'',
                    password:'',
                    email:''
                  }
  public signupFrm = {username:'',
                   password:'',
                   email:'',
                   repassword: ''};
    
    public myform: FormGroup;
    public username: FormControl;
    public password: FormControl;
    public repassword: FormControl;
    public email: FormControl;
    

  constructor(private _usersdata: LogincommonService,private router: Router) { }  

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this._usersdata.usersList.subscribe(res => {
      this.users = res;
      console.log(res)
   });
  }


  createFormControls() {
            this.username = new FormControl('', Validators.required);
            this.email = new FormControl('', [
              Validators.required,
              Validators.pattern("^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$")
            ]);
            this.password = new FormControl('', [Validators.required]);
            this.repassword = new FormControl('', [Validators.required]); // { Validator: this.passwordConfirming});
  }

  //passwordConfirming(c: AbstractControl): { invalid: boolean } {
   // if (this.signupFrm.repassword != this.signupFrm.password) {
     //   return { invalid: true};
  //  }
//}

  createForm() {
            this.myform = new FormGroup({
              username: this.username,
              password: this.password,
              repassword: this.repassword,
              email: this.email
    });
  }
  signup(){
       //this.spinnerService.show();
        setTimeout(()=>{ 
         // this.spinnerService.hide();
          alert('added employee sucessfully..! please login')
          this.users.push(this.userdata)
       this.signupFrm = {username:'',
                  password:'',
                  email:'',
                  repassword: ''};
       this._usersdata.usersList.next(this.users);
          this.router.navigate(['login']);
       },1000)
        
  
      
    


    }
    login(){
      this.router.navigate(['login']);
    }
}
