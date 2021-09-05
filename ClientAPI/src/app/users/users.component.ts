import { UserService } from './../Services/user.service';
import { UserModel } from './../Models/User.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users?: Array<UserModel>;

  constructor(
    private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.GetUsers().subscribe(u => this.users = u);
  }

  public ChangeRole(id: number, newRole: string) {    
    this._userService.ChangeRole(id, newRole).subscribe();
  }
}
