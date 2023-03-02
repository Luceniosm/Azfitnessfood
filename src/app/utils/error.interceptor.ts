import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Error400, sistemaOff, Error500 } from './library';


export let numberRequest = 0;
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private toastr: ToastrService,
                private spinner: NgxSpinnerService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      numberRequest = numberRequest + 1;
        this.spinner.show();
        return next.handle(request).pipe(
            finalize(() => {
              numberRequest = numberRequest - 1;
              if (numberRequest === 0) {
                this.spinner.hide();
              }
            }),
            catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload();
                this.toastr.error(err.error.message || err.statusText);
            } else if (err.status === 400) {
                if (err.error.errors.constructor === Array) {
                    if (err.error.errors[0].constructor === String) {
                        err.error.errors.forEach(element => {
                            this.toastr.error(element);
                        });
                    } else {
                        this.toastr.error(err.error.errors[0].description);
                    }
                } else {
                    this.toastr.error(err.error.errors);
                }
            } else if (err.status === 0) {
                this.toastr.error(sistemaOff);
            } else if (err.status === 404) {
              this.toastr.error(Error400);
            } else if (err.status === 500) {
              this.toastr.error(Error500);
            }


            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
