import { Router } from '@angular/router';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/Models/User.model';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  user!: UserModel;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getDetails().subscribe(data => this.user = data);
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl("account/login");
  }
}
