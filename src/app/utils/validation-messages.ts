import { regex } from "./regex-patterns";

export const validationMessages = {
  required: (fieldName: string) => `Please enter your ${fieldName}.`,
  otpExpire:(time: any) => `Expires in ${time} seconds.`,
};

export const Messages = {
  AUTH: {
    USERNAME_REQUIRED: "Email or mobile number is required.",
    USERNAME_INVALID: "Enter a valid email or mobile number",
    INVALID_EMAIL:"Please enter a valid email address.",
    INVALID_MOBILE:"Please enter a valid mobile number.",
    USER_NOT_FOUND: 'User not found',
    USER_FOUND: "Account found",
    LOGIN_SUCCESS:"Login Successful.",

    OTP_REQUIRED: "OTP is required",
    OTP_INVALID: "Incorrect OTP. Please re-enter.",
    OTP_LENGTH: "OTP must be exactly 6 digits",
    OTP_EXPIRED: "OTP expired. Please click 'Resend OTP'.", 
    OTP_FAILED: "Failed to send OTP. Please try again.",
    OTP_SENT: "OTP sent successfully.",
    OTP_SUCCESS: "OTP verified successfully.",
    OTP_VERIFY_FAILED: "OTP verification failed. Please try again.",
    OTP_VERIFY_EXPIRED: "OTP verification session has expired. Please request a new OTP.",
    OTP_VERIFY_INVALID: "The provided OTP is invalid.",
    OTP_VERIFY_REQUIRED: "OTP are required for verification.",  
    OTP_VERIFY_SUCCESS: "OTP verified successfully.",

    SESSION_EXPIRED: "Session has expired. Please login again.",

    PASSWORD_REQUIRED: "Please set a password for your account.",
    PASSWORD_MIN_LENGTH: `Password too small. Minimum ${regex.PASSWORD_RULES.MIN_LENGTH_PASSWORD} characters are required.`,
    PASSWORD_CONFIRM: `Please confirm your password.`,
    PASSWORD_MISMATCH: `The passwords do not match. Please try again.`,
    PASSWORD_RESET_SUCCESS:"Password reset successful. Please log in with your new password.",
    
    FETCH_USER_FAILED: "Failed to fetch user details. Please try again.",
    LOGOUT_SUCCESS: "Logged out successfully.",
    LOGOUT_ALL_SUCCESS: "Logged out from all devices successfully.",

    OLD_PASSWORD_REQUIRED: "Please enter your old password.",
    INVALID_OLD_PASSWORD: "Old password is incorrect.",
    PASSWORD_CHANGED: "Password changed successfully.",
    PASSWORD_CHANGE_FAILED: "Unable to change password. Please try again.",
    NEW_PASSWORD_REQUIRED: "Please enter your new password.",
    PASSWORD_PATTERN: "Password must contain one numeric, one special character, one uppercase and one lowercase.",
    CONFIRM_PASSWORD_REQUIRED: "Please confirm your new password."

  },
  PASSWORD_RULES:{
    SAME_AS_OLD: 'New password must be different from old password',
    PASSWORD_MIN_LENGTH: `At least ${regex.PASSWORD_RULES.MIN_LENGTH_PASSWORD} characters`,
    UPPERCASE_PASSWORD: "One uppercase letter",
    LOWERCASE_PASSWORD: "One lowercase letter",
    NUMBER_PASSWORD: "One number",
    SPECIAL_PASSWORD: "One special character",
    PASSWORD_INVALID: "Incorrect password.",
    
  },
  PROFILE: {
    FETCH_FAILED: 'Unable to load profile',
    FETCH_SUCCESS: 'Profile fetched successfully',

    FIRST_NAME_REQUIRED: 'Please enter your first name.',
    LAST_NAME_REQUIRED: 'Please enter your last name.',
    ONLY_LETTERS: 'This field can contain only letters.',
    NO_LEADING_TRAILING_SPACE: 'Leading or trailing spaces are not allowed.',
    MAX_LENGTH: 'The user should not be able to enter more than allocated characters.',
    UPDATE_SUCCESS: "Profile updated successfully"

  }
  
};