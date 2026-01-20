import { regex } from '../../utils/regex-patterns';
import { Messages } from '../../utils/validation-messages';

/**
 * Validator for fields that accept Email OR Mobile Number
 * Used by Login, Signup, Invite, etc
 */
export function emailOrMobileValidator() {
  
  return (control: any) => {
    const value = control.value;

    if (!value) {
      return { message: Messages.AUTH.USERNAME_REQUIRED };
    }

    // PHONE
    if (regex.MOBILE.test(value)) {
      return value.length === 10
        ? null
        : { message: Messages.AUTH.INVALID_MOBILE };
    }

    // EMAIL
    return regex.EMAIL.test(value)
      ? null
      : { message: Messages.AUTH.INVALID_EMAIL };
  };
}
