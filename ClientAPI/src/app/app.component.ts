import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './Services/user.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('dropmenu')
  dropMenuEl!: ElementRef;
  @ViewChild('smallScreenDropMenuTrigger')
  smalltriger!: ElementRef;

  selected?: HTMLElement;
  accountUrl = "";

  navHighlightOnLoad$: Observable<NavigationEnd>;

  constructor(private userService: UserService, private router: Router) {
    this.navHighlightOnLoad$ = this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit() {
    this.navHighlightOnLoad$.subscribe(() => { this.highlightNav(); });
    this.userService.isAuthorizated();
    this.userService.isAuth.subscribe(is => this.checkAuth(is));
  }

  highlightNav() {
    const url = this.router.url;

    this.selected?.classList.remove('selected');

    if (url.includes("main")) {
      this.selected = document.getElementById("main")!;
      this.selected.classList.add("selected");
    }
    else if (url.includes("products")) {
      this.selected = document.getElementById("products")!;
      this.selected.classList.add("selected");
    }
    else if (url.includes("contact")) {
      this.selected = document.getElementById("contact")!;
      this.selected.classList.add("selected");
    }
    else if (url.includes("account")) {
      this.selected = document.getElementById("account")!;
      this.selected.classList.add("selected");
    }
  }

  checkAuth(is: boolean) {
    const account = document.getElementById('account');
    if (is) {
      account!.innerHTML = "Account";
      this.accountUrl = "account/details";
    }
    else {
      account!.innerHTML = "Login";
      this.accountUrl = "account/login";
    }
  }

  // For small sreen
  dropMenu(event: Event) {        
    if (event.currentTarget === this.dropMenuEl.nativeElement || event.currentTarget === this.smalltriger.nativeElement) {
      if (
        !(this.dropMenuEl.nativeElement as HTMLElement).classList.contains(
          'drop'
        ) &&
        window.innerWidth < 600
      ) {
        (this.dropMenuEl.nativeElement as HTMLElement).classList.add('drop');
      } else {
        (this.dropMenuEl.nativeElement as HTMLElement).classList.remove('drop');
      }
    }
    else {
      (this.dropMenuEl.nativeElement as HTMLElement).classList.remove('drop');
    }
  }
}