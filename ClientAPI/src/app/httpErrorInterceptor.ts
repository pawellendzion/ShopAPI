import { CommonUrls } from './commonUrls';
import { Router } from '@angular/router';
import { ActivatedComponentService } from './Services/activated-component.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private _activatedComponent: ActivatedComponentService, 
    private _router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(
      catchError(this.HandleError())
    )
  }

  private HandleError() {
    return (error: HttpErrorResponse) => {
      let errorMessage = '';

      // If client side error
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      }
      // If server side error
      else {
        errorMessage = `Error: ${error.status} ${error.error}`;
      }

      if (error.status === 403) {
        this._router.navigateByUrl(CommonUrls.MainPageUrl);
        console.error('No permission');
      }

      switch (error.error) {
        case "UserNotFoundException":
        case "UserExistException":
          this._activatedComponent.Component.incorrect = true;
          break;
      }

      return throwError(errorMessage);
    }
  }
}
