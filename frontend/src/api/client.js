import axios from 'axios';

// Ensure this matches your Vite config proxy or defaults to localhost:8000/api
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the JWT token to every request if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const endpoints = {
  // Products
  products: '/products/',      // Result: /api/products/
  product: (id) => `/products/${id}/`,
  
  // Authentication
  login: '/token/',            // Result: /api/token/ (Standard SimpleJWT path)
  register: '/register/',      // Result: /api/register/ (Matches your new accounts app)
  refresh: '/token/refresh/',  // Result: /api/token/refresh/
  
  // Orders
  orders: '/orders/',
};

export default apiClient;