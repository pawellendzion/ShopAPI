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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(u => this.users = u);
  }

  public changeRole = (id: number, newRole: string) => {    
    this.userService.changeRole(id, newRole).subscribe();
  }
}
