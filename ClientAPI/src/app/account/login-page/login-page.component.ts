import { take } from 'rxjs/operators';
import { UserService } from '../../Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedComponentService } from '../../Services/activated-component.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  //#region properties
  public loginForm!: FormGroup;
  public incorrect = false;
  //#endregion

  //#region constructor
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _activedComponent: ActivatedComponentService,
    private _router: Router) { }
  //#endregion

  //#region implemented methods
  ngOnInit() {
    this._activedComponent.Component = this;

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  //#endregion

  //#region methods
  public OnSubmit(): void {
    if (this.loginForm.invalid) return;

    this._userService.Login(this.loginForm.getRawValue()).pipe(take(1)).subscribe(res => {
      const token = (<any>res).token;
      localStorage.setItem("jwt", token);
      this._userService.isAuth.next(true)
      this._router.navigateByUrl("main");
    });
  }
  //#endregion

  //#region getters
  public get Email() {
    return this.loginForm.get('email')!;
  }
  public get Password() {
    return this.loginForm.get('password')!;
  }
  //#endregion
}
