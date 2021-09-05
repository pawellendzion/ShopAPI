import { CommonUrls } from './commonUrls';
import { Observable, Subject } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UserService } from './Services/user.service';
import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  //#region properties
  public accountUrl = "";

  @ViewChild('dropmenu') private _dropMenuEl!: ElementRef;
  @ViewChild('smallScreenDropMenuTrigger') private _smalltriger!: ElementRef;

  private _selected?: HTMLElement;
  private _onNavigationEnd$: Observable<NavigationEnd>;
  private _onNavigationStart$: Observable<NavigationStart>;
  private _unsubscribe$ = new Subject<void>();
  //#endregion

  //#region constructor
  constructor(
    private _userService: UserService, 
    private _router: Router) {
      
    this._onNavigationEnd$ = this._router.events.pipe(
      takeUntil(this._unsubscribe$),
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;

    this._onNavigationStart$ = this._router.events.pipe(
      takeUntil(this._unsubscribe$),
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }
  //#endregion

  //#region implemented methods
  ngOnInit(): void {
    this._onNavigationStart$.subscribe(() => this._userService.Authenticate());
    this._onNavigationEnd$.subscribe(() => this.HighlightNav());
    this._userService.isAuth.pipe(takeUntil(this._unsubscribe$)).subscribe(isAuth => this.CheckAuth(isAuth));
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
  //#endregion

  //#region methods
  private HighlightNav(): void {
    const url = this._router.url;

    const select = (navEl: string) => {
      this._selected = document.getElementById(navEl)!;
      this._selected.classList.add("selected");
    }

    this._selected?.classList.remove('selected');

    if (url.includes("main")) {
      select("main");
    }
    else if (url.includes("products")) {
      select("products");
    }
    else if (url.includes("contact")) {
      select("contact");
    }
    else if (url.includes("account")) {
      select("account");
    }
  }

  private CheckAuth(isAuth: boolean): void {
    const account = document.getElementById('account');

    if (isAuth) {
      account!.innerHTML = "Account";
      this.accountUrl = CommonUrls.AccountDetailsPageUrl;
    }
    else {
      account!.innerHTML = "Login";
      this.accountUrl = CommonUrls.AccountLoginPageUrl;
    }
  }

  //#region For small sreen
  public DropMenu(event: Event): void {
    const domEl = this._dropMenuEl.nativeElement as HTMLElement;

    if (event.currentTarget === this._dropMenuEl.nativeElement ||
        event.currentTarget === this._smalltriger.nativeElement) {
      if (!domEl.classList.contains('drop') && 
          window.innerWidth < 600) {
            domEl.classList.add('drop');
      } 
      else {
        domEl.classList.remove('drop');
      }
    }
    else {
      domEl.classList.remove('drop');
    }
  }
  //#endregion
  //#endregion
}