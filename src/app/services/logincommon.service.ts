import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class LogincommonService {

   public usersList = new BehaviorSubject([{
    username: 'admin',
    password: 'admin',
    email: 'admin@test.com'
}, {
    username: 'user',
    password: 'user',
    email: 'user@test.com'
}]);

   
  public users = this.usersList.asObservable();

  constructor() { }
   
   getUsersList(){
      return this.usersList;
   }
}
