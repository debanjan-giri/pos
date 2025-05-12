/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} [currency='₹'] - The currency symbol
 * @param {string} [locale='en-IN'] - The locale to use for formatting
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = '₹', locale = 'en-IN') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace('₹', currency);
};

/**
 * Format a date
 * @param {Date|string} date - The date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @param {string} [locale='en-IN'] - The locale to use for formatting
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}, locale = 'en-IN') => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat(locale, defaultOptions).format(
    typeof date === 'string' ? new Date(date) : date
  );
};

/**
 * Format a time
 * @param {Date|string} date - The date to format
 * @param {boolean} [includeSeconds=false] - Whether to include seconds
 * @param {string} [locale='en-IN'] - The locale to use for formatting
 * @returns {string} - Formatted time string
 */
export const formatTime = (date, includeSeconds = false, locale = 'en-IN') => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    ...(includeSeconds ? { second: '2-digit' } : {}),
  };
  
  return new Intl.DateTimeFormat(locale, options).format(
    typeof date === 'string' ? new Date(date) : date
  );
};

/**
 * Truncate a string to a specified length
 * @param {string} str - The string to truncate
 * @param {number} [length=50] - The maximum length
 * @param {string} [suffix='...'] - The suffix to add to truncated strings
 * @returns {string} - Truncated string
 */
export const truncateString = (str, length = 50, suffix = '...') => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length - suffix.length) + suffix;
};

/**
 * Convert a number to a percentage string
 * @param {number} value - The value to convert
 * @param {number} [decimals=0] - The number of decimal places
 * @returns {string} - Percentage string
 */
export const toPercentage = (value, decimals = 0) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format a number with thousands separators
 * @param {number} number - The number to format
 * @param {number} [decimals=0] - The number of decimal places
 * @param {string} [locale='en-IN'] - The locale to use for formatting
 * @returns {string} - Formatted number string
 */
export const formatNumber = (number, decimals = 0, locale = 'en-IN') => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};
