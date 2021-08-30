import { ActivatedComponentService } from '../../Services/activated-component.service';
import { UserService } from '../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkPasswordsValidator } from '../../Validators/check-passwords.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  public incorrect = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public activatedComponent: ActivatedComponentService,
    private router: Router) { }

  ngOnInit() {
    this.activatedComponent.setComponent(this)
    
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), checkPasswordsValidator],
      ],
      confirmPassword: ['', [Validators.required, checkPasswordsValidator]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.userService.register(this.registerForm.getRawValue()).subscribe()
    this.router.navigateByUrl("account/login");
  }

  get firstName() {
    return this.registerForm.get('firstName')!;
  }
  get lastName() {
    return this.registerForm.get('lastName')!;
  }
  get email() {
    return this.registerForm.get('email')!;
  }
  get password() {
    return this.registerForm.get('password')!;
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }
}
