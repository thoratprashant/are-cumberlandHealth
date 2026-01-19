/**
 * Minimal user data used in UI
 * (HIPAA-safe: no PHI, no credentials)
 */
export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
}

/**
 * Supported user roles
 */
export type UserRole =
  | 'system_admin'
  | 'admin'
  | 'front_desk'
  | 'provider';

/**
 * Token structure returned from backend
 */
export interface AuthToken {
  accessToken: string;
  expiresIn?: number;
}

/**
 * Login / OTP verify response
 */
export interface AuthResponse {
  token: AuthToken;
  user: AuthUser;
}
