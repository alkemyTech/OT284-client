import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class PrivateApiInterceptor implements HttpInterceptor {

  constructor( private auth: AuthService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('uid');

    if ( !token ) {
      return next.handle(request);
    }

    const cloned = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    })

    return next.handle(cloned).pipe(
      catchError( (response: HttpErrorResponse) => {
        if ( response.status === 401 ) {
          this.auth.logoutFirebase();
        }
        return throwError(() => response);
      })
    );

  }
}
