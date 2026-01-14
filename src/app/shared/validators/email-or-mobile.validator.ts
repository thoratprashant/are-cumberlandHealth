import { regex } from '../../utils/regex-patterns';
import { Messages } from '../../utils/validation-messages';

/**
 * Validator for fields that accept Email OR Mobile Number
 * Used by Login, Signup, Invite, etc
 */
export function emailOrMobileValidator() {
  return (control: any) => {

    // Required validation
    if (!control.value) {
      return { message: Messages.AUTH.USERNAME_REQUIRED };
    }

    const value = control.value;

    // Pattern validation
    const isValid =
      regex.EMAIL.test(value) || regex.MOBILE.test(value);

    return isValid
      ? null
      : { message: Messages.AUTH.USERNAME_INVALID };
  };
}
