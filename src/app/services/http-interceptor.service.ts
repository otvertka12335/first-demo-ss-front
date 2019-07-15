import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {'Content-Type': 'application/json'};
    const cloned = req.clone({
      url: 'http://localhost:3000' + req.url,
      setHeaders: headers
    });
    return next.handle(cloned).pipe(
      catchError(err => {
        console.log('Error status code: ' + err.status);
        return throwError(err);
      })
    );
  }

}
