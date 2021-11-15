import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {MastermindService} from "../services/mastermind.service";

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(private mastermind: MastermindService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.mastermind.onHttpRequest.next(request.method + " " + request.url + " - " + JSON.stringify(request.body))
    return next.handle(request);
  }
}
