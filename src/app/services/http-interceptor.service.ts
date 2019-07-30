import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = environment.api;
    const headers = {'Content-Type': 'application/json'};
    const cloned = req.clone({
      url: apiUrl + req.url,
      setHeaders: headers
    })
    return next.handle(cloned).pipe(
      catchError(err => {
        console.log('Error status code: ' + err.status);
        return throwError(err);
      })
    );
  }

}
