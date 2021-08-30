import { Router } from '@angular/router';
import { UserService } from './Services/user.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('dropmenu')
  dropMenuEl!: ElementRef;
  @ViewChild('smallScreenDropMenuTriger')
  smalltriger!: ElementRef;

  selected?: HTMLElement;
  accountUrl = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.isAuthorizated();
    this.userService.isAuth.subscribe(is => this.checkAuth(is));
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

  onSelect(event: Event) {
    this.selected?.classList.remove('selected');
    this.selected = event.target as HTMLElement;
    this.selected.classList.add('selected');
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