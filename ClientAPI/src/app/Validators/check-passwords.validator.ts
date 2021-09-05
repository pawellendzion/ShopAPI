import { AbstractControl, ValidationErrors } from '@angular/forms';

export function CheckPasswordsValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.parent?.get('password');
  const confirmPassword = control.parent?.get('confirmPassword');

  const isEqual = password?.value === confirmPassword?.value;

  if (isEqual && confirmPassword?.hasError('notMatching')) {
    confirmPassword.setErrors({ notMatching: null });
    confirmPassword.updateValueAndValidity();
    return null;
  }

  // doesn't set errors for password control
  if (control === password) {
    confirmPassword?.setErrors({ notMatching: true });
    confirmPassword?.updateValueAndValidity();

    return null;
  }
  
  return isEqual ? null : { notMatching: true };
}
