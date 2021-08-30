import { Router } from '@angular/router';
import { ActivatedComponentService } from './Services/activated-component.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private activatedComponent: ActivatedComponentService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(
      catchError(this.handleError(this.activatedComponent))
    )
  }

  private handleError<T>(service: ActivatedComponentService) {
    return (error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) errorMessage = `Error: ${error.error.message}`;
      else {
        errorMessage = `Error: ${error.status} ${error.error}`;
      }

      if (error.status === 403) {
        this.router.navigateByUrl('main');
        console.error('No permission');
      }

      switch (error.error) {
        case "UserNotFoundException":
        case "UserExistException":
          service.getComponent.incorrect = true;
          break;
      }

      return throwError(errorMessage);
    }
  }
}
