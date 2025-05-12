/**
 * Validate an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate a phone number (Indian format)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
export const isValidPhone = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

/**
 * Validate a GST number (Indian format)
 * @param {string} gst - The GST number to validate
 * @returns {boolean} - Whether the GST number is valid
 */
export const isValidGST = (gst) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(gst);
};

/**
 * Validate a PAN number (Indian format)
 * @param {string} pan - The PAN number to validate
 * @returns {boolean} - Whether the PAN number is valid
 */
export const isValidPAN = (pan) => {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan);
};

/**
 * Validate a PIN code (Indian format)
 * @param {string} pin - The PIN code to validate
 * @returns {boolean} - Whether the PIN code is valid
 */
export const isValidPIN = (pin) => {
  const regex = /^[1-9][0-9]{5}$/;
  return regex.test(pin);
};

/**
 * Validate a password
 * @param {string} password - The password to validate
 * @param {Object} options - Validation options
 * @param {number} [options.minLength=8] - Minimum password length
 * @param {boolean} [options.requireUppercase=true] - Whether to require uppercase letters
 * @param {boolean} [options.requireLowercase=true] - Whether to require lowercase letters
 * @param {boolean} [options.requireNumbers=true] - Whether to require numbers
 * @param {boolean} [options.requireSpecialChars=true] - Whether to require special characters
 * @returns {boolean} - Whether the password is valid
 */
export const isValidPassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;

  if (!password || password.length < minLength) return false;

  if (requireUppercase && !/[A-Z]/.test(password)) return false;
  if (requireLowercase && !/[a-z]/.test(password)) return false;
  if (requireNumbers && !/[0-9]/.test(password)) return false;
  if (requireSpecialChars && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) return false;

  return true;
};

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param {*} value - The value to check
 * @returns {boolean} - Whether the value is empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
};
