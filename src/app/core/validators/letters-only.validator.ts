import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidationRules } from '../constants/validation.constants';

export function lettersOnlyValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) return null;

  return ValidationRules.NAME.REGEX.test(control.value)
    ? null
    : { lettersOnly: true };
}
