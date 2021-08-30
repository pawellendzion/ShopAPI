import { RegisterModel } from './../Models/Register.model';
import { LoginModel } from './../Models/Login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../Models/User.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {
  accountUrl = "https://localhost:5001/account";
  header = new HttpHeaders().set('Content-Type', 'application/json');
  isAuth = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  /**
   * result is in isAuth
   */
  isAuthorizated() {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token))
      this.isAuth.next(true)
    else
      this.isAuth.next(false);
  }

  login(userLogin: LoginModel): Observable<unknown> {
    return this.http.post(`${this.accountUrl}/login`, userLogin, { headers: this.header });
  }

  logout() {
    localStorage.removeItem('jwt');
    this.isAuth.next(false);
  }

  register(userRegister: RegisterModel) {
    return this.http.post<UserModel>(`${this.accountUrl}/register`, userRegister, { headers: this.header });
  }

  getDetails(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.accountUrl}/details`);
  }

  getRole(): any {
    if (this.isAuth.value) {
      const token = localStorage.getItem('jwt');
      const role = this.jwtHelper.decodeToken(token!)
      return role.Roles;
    }
  }
}
