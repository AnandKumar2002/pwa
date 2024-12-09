import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpMethodInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'DELETE'
    ) {
      const modifiedReq = req.clone({
        setParams: {
          _method: req.method.toLowerCase(),
        },
        method: 'POST',
      });
      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
