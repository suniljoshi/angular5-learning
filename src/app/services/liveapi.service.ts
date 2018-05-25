import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Liveapiservice {
   
   public getAllUrl = 'https://jsonplaceholder.typicode.com/users';

   
  constructor(private http: HttpClient) { }
   
  getAllUsers() {
      return this.http.get(this.getAllUrl);
  }
   
}

