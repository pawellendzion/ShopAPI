import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  template: '<router-outlet></router-outlet>',
})
export class AccountComponent implements OnInit {
  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.userService.isAuthorizated();
  }
 }
