import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import 'rxjs/add/observable/throw';
// import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    pendingRequests = 0;
    // @BlockUI() blockUI: NgBlockUI;

    constructor(public auth: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // increment to track the number of pending requests
        this.pendingRequests++;
        const url = req.url;

        if (this.auth.getToken()) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
        }
        // send the newly created request
        return next.handle(req)
            .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response and headers you want
                    if (event.body.code === 401) {
                        this.auth.removeToken();
                        this.router.navigate(['/auth/login']);
                    }
                }
                return event;
            })
            .catch((error, caught) => {
                if (error.status === 401) {
                    // logout users, redirect to login page
                    this.auth.removeToken();

                } else {
                  return Observable.throw(error);
                }
            }).finally(() => {
                // there are no more pending requests
                // this.blockUI.stop();
            }) as any;
    }
}
