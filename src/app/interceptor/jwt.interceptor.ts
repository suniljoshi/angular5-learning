import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { constantData } from "../constants/constants";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*let test = constantData.testing;
            if(test){
                localStorage.setItem('currentUser', JSON.stringify(constantData.testToken));
                localStorage.setItem('users', JSON.stringify(constantData.SetUsers));
        }*/


        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
 
        return next.handle(request);
    }
}