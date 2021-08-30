import { UserService } from './../Services/user.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class accountGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.userService.isAuthorizated();
        
        if (state.url === '/account') {
            if (this.userService.isAuth.value) {
                this.router.navigateByUrl("account/details")
                return true;
            }
            else {
                this.router.navigateByUrl("account/login");
                return true;
            }
        }
        else if ((state.url === "/account/login" || state.url === "/account/register") && this.userService.isAuth.value) {
            this.router.navigateByUrl("account/details");
            return true;
        }
        else if (state.url === "/account/details" && !this.userService.isAuth.value) {
            this.router.navigateByUrl("account/login");
            return true;
        }
        return true;
    }
}