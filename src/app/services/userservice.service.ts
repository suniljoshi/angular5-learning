import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../modals/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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

  /*getActionWithParam<T>(param: any, path: string) {
    return this.http.get(path)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAction<T>(path: string) {
    return this.http.get(path)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: any) {
    if (res && res.status === 200) {
      return res.json() || {};
    } else {
      return res || {};
    }
  }

  private handleError(error: any) {
    let unauth: Boolean = false;
    unauth = (error.status === 401) ? true : false;
    if (unauth === true) {
      //location.pathname = Constants.loginPath;
    }
    return Observable.throw(error);
  }*/

}

