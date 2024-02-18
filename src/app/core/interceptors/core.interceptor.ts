import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable()
export class CoreInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      url: environment.apiUrl + request.url,
    });

    return next.handle(request);
  }
}