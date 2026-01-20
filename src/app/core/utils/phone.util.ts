// phone.util.ts

/**
 * Normalize US phone number
 * Stores ONLY digits (max 10)
 */
export function normalizeUSPhone(value: string): string {
  return value.replace(/\D/g, '').substring(0, 10);
}

/**
 * Display US phone format
 * 1234567890 → (123) 456-7890
 */
export function formatUSPhone(value: string): string {
  const digits = normalizeUSPhone(value);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
