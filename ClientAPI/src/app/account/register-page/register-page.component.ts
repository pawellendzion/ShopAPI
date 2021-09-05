import { CommonUrls } from './../../commonUrls';
import { ActivatedComponentService } from '../../Services/activated-component.service';
import { UserService } from '../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckPasswordsValidator } from '../../Validators/check-passwords.validator';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  //#region properties
  public registerForm!: FormGroup;
  public incorrect = false;
  //#endregion

  //#region constructor
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _activatedComponent: ActivatedComponentService,
    private _router: Router) { }
  //#endregion

  //#region implemented methods
  ngOnInit() {
    this._activatedComponent.Component = this;
    
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), CheckPasswordsValidator],
      ],
      confirmPassword: ['', [Validators.required, CheckPasswordsValidator]],
    });
  }
  //#endregion

  //#region methods
  public OnSubmit() {
    if (this.registerForm.invalid) return;

    this._userService.Register(this.registerForm.getRawValue()).pipe(take(1)).subscribe(() =>
      this._router.navigateByUrl(CommonUrls.AccountLoginPageUrl));
  }
  //#endregion

  //#region getters
  public get FirstName() {
    return this.registerForm.get('firstName')!;
  }
  public get LastName() {
    return this.registerForm.get('lastName')!;
  }
  public get Email() {
    return this.registerForm.get('email')!;
  }
  public get Password() {
    return this.registerForm.get('password')!;
  }
  public get ConfirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }
  //#endregion
}
