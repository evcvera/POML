import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthenticationService} from '../services/authentication.service';
import {AuthenticationGoogleService} from "../services/authentication-google.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationGoogleService: AuthenticationGoogleService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        this.authenticationGoogleService.signOut();
        location.reload();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
