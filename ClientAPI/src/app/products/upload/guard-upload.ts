import { UserService } from './../../Services/user.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.userService.isAuthorizated();
        const role = this.userService.getRole();
        if (this.userService.isAuth.value && (role === "Manager" || role === "Admin")) {
            return true;
        }
        else {
            this.router.navigateByUrl('main');
            return false;
        }
    }

}