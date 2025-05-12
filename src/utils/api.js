/**
 * Base API URL
 * @type {string}
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Default request timeout in milliseconds
 * @type {number}
 */
const DEFAULT_TIMEOUT = 30000;

/**
 * Custom fetch with timeout and error handling
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} [timeout=DEFAULT_TIMEOUT] - Request timeout in milliseconds
 * @returns {Promise<any>} - Response data
 * @throws {Error} - If the request fails
 */
const fetchWithTimeout = async (url, options = {}, timeout = DEFAULT_TIMEOUT) => {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout}ms`);
    }
    throw error;
  }
};

/**
 * API client with methods for common HTTP requests
 */
const api = {
  /**
   * Make a GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} [options={}] - Additional fetch options
   * @returns {Promise<any>} - Response data
   */
  get: (endpoint, options = {}) => {
    return fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      ...options,
    });
  },

  /**
   * Make a POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} [options={}] - Additional fetch options
   * @returns {Promise<any>} - Response data
   */
  post: (endpoint, data, options = {}) => {
    return fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },

  /**
   * Make a PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} [options={}] - Additional fetch options
   * @returns {Promise<any>} - Response data
   */
  put: (endpoint, data, options = {}) => {
    return fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },

  /**
   * Make a PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} [options={}] - Additional fetch options
   * @returns {Promise<any>} - Response data
   */
  patch: (endpoint, data, options = {}) => {
    return fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    });
  },

  /**
   * Make a DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} [options={}] - Additional fetch options
   * @returns {Promise<any>} - Response data
   */
  delete: (endpoint, options = {}) => {
    return fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      ...options,
    });
  },
};

export default api;
