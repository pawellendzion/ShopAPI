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
  loginForm!: FormGroup;
  public incorrect = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activedComponent: ActivatedComponentService,
    private router: Router) { }

  ngOnInit() {
    this.activedComponent.setComponent(this);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.userService.login(this.loginForm.getRawValue()).subscribe(res => {
      const token = (<any>res).token;
      localStorage.setItem("jwt", token);
      this.userService.isAuth.next(true)
      this.router.navigateByUrl("main");
    });
  }

  // Getters
  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
