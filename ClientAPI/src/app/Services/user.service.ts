import { RegisterModel } from './../Models/Register.model';
import { LoginModel } from './../Models/Login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../Models/User.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //#region properties
  private _accountUrl = "https://localhost:5001/account";
  private _header = new HttpHeaders().set('Content-Type', 'application/json');
  
  public isAuth = new BehaviorSubject<boolean>(false);
  //#endregion

  //#region constructor
  constructor(
    private _http: HttpClient, 
    private _jwtHelper: JwtHelperService) { }
  //#endregion
  
  //#region methods
  /**
   * result is in isAuth
   */
  public Authenticate() {
    const token = localStorage.getItem('jwt');
    if (token && !this._jwtHelper.isTokenExpired(token))
      this.isAuth.next(true)
    else
      this.isAuth.next(false);
  }

  public Login(userLogin: LoginModel) {
    return this._http.post(`${this._accountUrl}/login`, userLogin, { headers: this._header });
  }
  
  public Register(userRegister: RegisterModel) {
    return this._http.post<UserModel>(`${this._accountUrl}/register`, userRegister, { headers: this._header });
  }

  public Logout() {
    localStorage.removeItem('jwt');
    this.isAuth.next(false);
  }

  public GetDetails() {
    return this._http.get<UserModel>(`${this._accountUrl}/details`);
  }

  public GetRole() {
    if (this.isAuth.value) {
      const token = localStorage.getItem('jwt');
      const role = this._jwtHelper.decodeToken(token!)
      return role.Roles;
    }
    return '';
  }

  public GetUsers() {
    return this._http.get<UserModel[]>(`${this._accountUrl}/users`);
  }

  public ChangeRole(id: number, newRole: string) {
    return this._http.patch(`${this._accountUrl}/users`, {userId: id, userNewRole: newRole});
  }
  //#endregion
}
