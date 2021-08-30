import { AbstractControl, ValidationErrors } from '@angular/forms';

export function checkPasswordsValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.parent?.get('password');
  const confirmPassword = control.parent?.get('confirmPassword');

  const isEqual = password?.value === confirmPassword?.value;

  if (isEqual && confirmPassword?.hasError('notMatching')) {
    confirmPassword.setErrors({ notMatching: null });
    confirmPassword.updateValueAndValidity();
    return null;
  }

  if (control === password) {
    confirmPassword?.setErrors({ notMatching: control.value });
    confirmPassword?.updateValueAndValidity();

    return null;
  }
  return isEqual ? null : { notMatching: control.value };
}
