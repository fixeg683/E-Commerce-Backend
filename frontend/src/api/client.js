import axios from 'axios';

/**
 * API base URL resolution:
 * - Docker: http://backend:8000/api
 * - Local dev (no Docker): http://localhost:8000/api
 *
 * VITE_API_BASE_URL should be defined in:
 *   - Docker: http://backend:8000/api
 *   - Local:  http://localhost:8000/api
 */
const API_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Automatically attach JWT access token if present
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Centralized API endpoints
 */
export const endpoints = {
  // Products
  products: '/products/',
  product: (id) => `/products/${id}/`,

  // Authentication (SimpleJWT)
  login: '/token/',
  refresh: '/token/refresh/',
  register: '/register/',

  // Orders
  orders: '/orders/',
};

export default apiClient;
