import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Ensures new password is different from old password
 */
export function newPasswordDifferentValidator(
  oldKey: string,
  newKey: string
): ValidatorFn {

  return (group: AbstractControl): ValidationErrors | null => {
    const oldPassword = group.get(oldKey);
    const newPassword = group.get(newKey);

    if (!oldPassword || !newPassword) return null;

    if (newPassword.errors && !newPassword.errors['sameAsOld']) {
      return null; // keep other validators
    }

    if (oldPassword.value === newPassword.value) {
      newPassword.setErrors({ sameAsOld: true });
      return { sameAsOld: true };
    } else {
      newPassword.setErrors(null);
      return null;
    }

  };
}
