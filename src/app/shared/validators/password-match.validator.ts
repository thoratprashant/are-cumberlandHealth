import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that two form fields have identical values.
 * Used for password + confirm password.
 *
 * @param passwordKey - name of password control
 * @param confirmKey - name of confirm password control
 */
export function passwordMatchValidator(
  passwordKey: string,
  confirmKey: string
): ValidatorFn {

  return (group: AbstractControl): ValidationErrors | null => {

    const password = group.get(passwordKey);
    const confirm = group.get(confirmKey);

    if (!password || !confirm) return null;

    if (confirm.errors && !confirm.errors['mismatch']) {
      return null; // keep other validators
    }

    if (password.value !== confirm.value) {
      confirm.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      confirm.setErrors(null);
      return null;
    }
  };
}
