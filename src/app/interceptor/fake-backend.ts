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

     let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
     let appData = [
        { id: 11, name: 'Ajanta' , email: 'test@gmail.com', mobile: 99956652222 },
        { id: 12, name: 'Berkley',  email: 'iiiiiii@gmail.com', mobile: 34567845645  },
        { id: 13, name: 'Drump', email: 'uuuu@gmail.com', mobile: 987654333344  },
        { id: 14, name: 'Celeritas', email: 'yyyyy@gmail.com', mobile: 99956652222  },
        { id: 15, name: 'Magneta', email: 'rrrrr@gmail.com', mobile: 99956652222  },
        { id: 16, name: 'RubberMan', email: 'weeeee@gmail.com', mobile: 99956652222  },
        { id: 17, name: 'Dynama', email: 'weeeee@gmail.com', mobile: 99956652222  },
        { id: 18, name: 'Dr IQ', email: 'weewewwe@gmail.com', mobile: 99956652222  },
        { id: 19, name: 'Magma', email: 'asd@gmail.com', mobile: 99956652222  },
        { id: 20, name: 'Tornado', email: 'okjh@gmail.com', mobile: 99956652222  },
        { id: 21, name: 'Mr. Nice 234' , email: 'test@gmail.com', mobile: 99956652222 },
        { id: 22, name: 'Narco 234',  email: 'iiiiiii@gmail.com', mobile: 34567845645  },
        { id: 23, name: 'Bombasto 32423432', email: 'uuuu@gmail.com', mobile: 987654333344  },
        { id: 24, name: 'Celeritas555', email: 'yyyyy@gmail.com', mobile: 99956652222  },
        { id: 25, name: 'Magneta5555', email: 'rrrrr@gmail.com', mobile: 99956652222  },
        { id: 26, name: 'RubberMan76777 5', email: 'weeeee@gmail.com', mobile: 99956652222  },
        { id: 27, name: 'Dynama 5', email: 'weeeee@gmail.com', mobile: 99956652222  },
        { id: 28, name: 'Dr IQ 5', email: 'weewewwe@gmail.com', mobile: 99956652222  },
        { id: 29, name: 'Magma 5', email: 'asd@gmail.com', mobile: 99956652222  },
        { id: 30, name: 'Tornado 5', email: 'okjh@gmail.com', mobile: 99956652222  },
        { id: 31, name: 'Mr. Nice 5' , email: 'test@gmail.com', mobile: 99956652222 },
        { id: 32, name: 'Narc 5o',  email: 'iiiiiii@gmail.com', mobile: 34567845645  },
        { id: 33, name: 'Bomb 5asto', email: 'uuuu@gmail.com', mobile: 987654333344  },
        { id: 34, name: 'Celeri 5tas', email: 'yyyyy@gmail.com', mobile: 99956652222  },
        { id: 35, name: 'Magn 5eta', email: 'rrrrr@gmail.com', mobile: 99956652222  },
        { id: 36, name: 'Rubb 4erMan', email: 'weeeee@gmail.com', mobile: 99956652222  },
        { id: 37, name: 'Dyna 4ma', email: 'weeeee@gmail.com', mobile: 99956652222  },
        { id: 38, name: 'Dr  4IQ', email: 'weewewwe@gmail.com', mobile: 99956652222  },
        { id: 39, name: 'Mag 4ma', email: 'asd@gmail.com', mobile: 99956652222  },
        { id: 40, name: 'Torn 4ado', email: 'okjh@gmail.com', mobile: 99956652222  },
        { id: 41, name: 'Mr. Ni 4ce 234' , email: 'test@gmail.com', mobile: 99956652222 },
        { id: 42, name: 'Narco 23 44',  email: 'iiiiiii@gmail.com', mobile: 34567845645  },
        { id: 43, name: 'Bombasto 3 42423432', email: 'uuuu@gmail.com', mobile: 987654333344  },
        { id: 44, name: 'Celeritas 4555', email: 'yyyyy@gmail.com', mobile: 99956652222  },
        { id: 45, name: 'Magneta555 45', email: 'rrrrr@gmail.com', mobile: 99956652222  },
        { id: 46, name: 'RubberMan7677 47', email: 'weeeee@gmail.com', mobile: 99956652222  },
        { id: 47, name: 'Dynama 4', email: 'weeeee@gmail.com', mobile: 99956652222  },
        { id: 48, name: 'Dr IQ 4', email: 'weewewwe@gmail.com', mobile: 99956652222  },
        { id: 49, name: 'Magma 4', email: 'asd@gmail.com', mobile: 99956652222  }
      ]
     
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
           
            // Get for server side pagination

            if (request.url.includes('api/users/pagination') && request.method === 'GET') {
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                 
                    let limit =  Number(getParameterByName('limit', request.url))
                    let total =  Number(getParameterByName('total', request.url))
                    let skip  =  Number(getParameterByName('skip', request.url))
                    let keyword  =  getParameterByName('filter', request.url)
                    let sortby  =  getParameterByName('sort', request.url)
                  
                    let sliced = appData.splice(skip, limit);
                    if(keyword != ''){
                       var filteredData = appData.filter(function(user){
                          return user.name.toLocaleLowerCase().includes(keyword)
                       })
                       console.log(filteredData)
                       sliced = filteredData;
                       
                    }
                    if(sortby != ''){
                        if(!sortby.toLocaleLowerCase().includes('-')){
                        let sortedData;
                            
                        if(sortby == 'name' || sortby == 'email'){
                             sortedData  = sliced.sort(function(a,b){
                               if (a[sortby] < b[sortby])
                               return -1;
                             if (a[sortby] > b[sortby])
                               return 1;
                             return 0;
                            });
                        }
                        else{
                             sortedData  = sliced.sort(function(a,b){
                                return a[sortby] - b[sortby]
                            });
                        }
                       
                        sliced = sortedData
                    }


                        
                        if(sortby.toLocaleLowerCase().includes('-')){
                            let sortbynagative = sortby.split("-").pop();
                            let sortedData;
                            
                            if(sortbynagative == 'name' || sortbynagative == 'email'){
                                 sortedData  = sliced.sort(function(a,b){
                                    if (a[sortbynagative] > b[sortbynagative])
                                    return -1;
                                  if (a[sortbynagative] < b[sortbynagative])
                                    return 1;
                                  return 0;
                                });
                            }
                            else{
                                 sortedData  = sliced.sort(function(a,b){
                                    return b[sortbynagative] - a[sortbynagative]
                                });
                            }
                           
                            sliced = sortedData
                        }
                    }
                    


                    let bodyData = {
                       total: appData.length,
                       data:sliced,
                       filter: keyword,
                       sortby : sortby
                    }
                  
                    



                    return Observable.of(new HttpResponse({ status: 200, body: bodyData }));
                } else {
                    return Observable.throw('Unauthorised');
                }
            }
           

      
             
           
           
              function getParameterByName(name, url) {
                        if (!url) url = window.location.href;
                        name = name.replace(/[\[\]]/g, "\\$&");
                        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                            results = regex.exec(url);
                        if (!results) return null;
                        if (!results[2]) return '';
                        return decodeURIComponent(results[2].replace(/\+/g, " "));
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