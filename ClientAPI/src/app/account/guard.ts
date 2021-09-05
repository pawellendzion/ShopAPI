import { CommonUrls } from './../commonUrls';
import { UserService } from './../Services/user.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class accountGuard implements CanActivate {
    constructor(
        private _userService: UserService, 
        private _router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (state.url === '/account') {
            if (this._userService.isAuth.value) {
                this._router.navigateByUrl(CommonUrls.AccountDetailsPageUrl)
            }
            else {
                this._router.navigateByUrl(CommonUrls.AccountLoginPageUrl);
            }
        }
        else if ((state.url === CommonUrls.AccountLoginPageUrl || 
                  state.url === CommonUrls.AccountRegisterPageUrl) && 
                  this._userService.isAuth.value) {
            this._router.navigateByUrl(CommonUrls.AccountDetailsPageUrl);
        }
        else if (state.url === CommonUrls.AccountDetailsPageUrl &&
                 !this._userService.isAuth.value) {
            this._router.navigateByUrl(CommonUrls.AccountLoginPageUrl);
        }
        return true;
    }
}