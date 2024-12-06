import axios from 'axios';
import { store } from '../store/store';
import { logoutUser } from '../store/authSlice';

// Base URL configuration
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Request interceptor for adding token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized (401), log out the user
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutUser());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;