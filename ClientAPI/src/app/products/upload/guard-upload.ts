import { CommonUrls } from './../../commonUrls';
import { UserService } from './../../Services/user.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadGuard implements CanActivate {
    constructor(
        private _userService: UserService, 
        private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const role = this._userService.GetRole();
        if (this._userService.isAuth.value && (role === "Manager" || role === "Admin")) {
            return true;
        }
        else {
            this._router.navigateByUrl(CommonUrls.MainPageUrl);
            return false;
        }
    }

}