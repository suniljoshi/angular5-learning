import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../modals/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Usersdata } from './userdata';

@Injectable()
export class UserserviceService {

  constructor(private http: HttpClient) { }
    private mockAPi = true;
  getAll() {
      return this.http.get<User[]>('/api/users');
  }

  getById(id: number) {
      return this.http.get('/api/users/' + id);
  }

  create(user: User) {
      return this.http.post('/api/users', user);
  }

  update(user: User) {
      return this.http.put('/api/users/' + user.id, user);
  }

  delete(id: number) {
      return this.http.delete('/api/users/' + id);
  }

  getDataServerPagination(limit, skip, total, filter, sortby){
    return this.http.get<Usersdata>('/api/users/pagination/?limit='+ limit + '&skip='+skip+'&total='+ total+ '&filter='+filter+ '&sort='+sortby);
}

 isLoggedIn(){
      if(localStorage.getItem('currentUser') != null)
         return true
      else 
         return false
   }
   
}

