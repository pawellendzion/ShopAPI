import { CommonUrls } from './../../commonUrls';
import { Router } from '@angular/router';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/Models/User.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  public user!: UserModel;

  constructor(
    private _userService: UserService, 
    private _router: Router) { }

  ngOnInit(): void {
    this._userService.GetDetails().pipe(take(1)).subscribe(data => this.user = data);
  }

  public Logout(): void {
    this._userService.Logout();
    this._router.navigateByUrl(CommonUrls.AccountLoginPageUrl);
  }
}
