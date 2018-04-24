import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() {     }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    // let users =  [{"username":"luv","password":"luv","email":"luv@gmail.com","id":4},{"username":"pitbull","password":"pitbull","email":"pitbull@gmail.com","id":5},{"username":"pitbull12","password":"pitbull","email":"pitbull12@gmail.com","id":6},{"username":"gmail","password":"gmail","email":"gmial@gmail.com","id":5},{"username":"sjjd","password":"111","email":"jdsjdj@gmsm.vvv","id":6},{"username":"sdfsf","password":"1212","email":"fsdfs@gsdd.sdf","id":7},{"username":"sunil","password":"sunil","email":"sunil@sunil.com","id":8},{"username":"nima","password":"nima","email":"nima@gmail.com","id":9},{"username":"sdfsdfsf","password":"1111","email":"sdfs@dsfsdf.com","id":9}];
     let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        return Observable.of(null).mergeMap(() => {
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });
 
                if (filteredUsers.length) {
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        password: user.password,
                        token: 'fake-jwt-token'
                    };
 
                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    return Observable.throw('Username or password is incorrect');
                }
            }
 
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: users }));
                } else {
                    return Observable.throw('Unauthorised');
                }
            }
 
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {

                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;
 
                    return Observable.of(new HttpResponse({ status: 200, body: user }));
                } else {
                    return Observable.throw('Unauthorised');
                }
            }

            if (request.url.endsWith('/api/users') && request.method === 'POST') {
                let newUser = request.body;
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return Observable.throw('Username "' + newUser.username + '" is already taken');
                }
 
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                return Observable.of(new HttpResponse({ status: 200 }));
            }
 
            // delete user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }
 
                    return Observable.of(new HttpResponse({ status: 200 }));
                } else {

                    return Observable.throw('Unauthorised');
                }
            }

            return next.handle(request);
             
        })
 
        
        .materialize()
        .delay(500)
        .dematerialize();
    }
}
 
export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};