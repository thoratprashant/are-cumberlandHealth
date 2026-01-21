import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noTrimValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) return null;

  return control.value.trim() === control.value
    ? null
    : { trimError: true };
}
