import axios from 'axios';
import { User } from '../types/user';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
});

interface SignupData {
  email: string;
  password: string;
  displayName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  message: string;
}

/**
 * Authentication service for handling user auth operations
 */
export const authService = {
  /**
   * Register a new user
   * @param {SignupData} userData - User registration data
   * @returns {Promise<AuthResponse>} Registration response
   */
  signup: async (userData: SignupData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/signup', userData);
      return response.data;
    } catch (error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      throw new Error(axiosError.response?.data?.error || 'Signup failed');
    }
  },

  /**
   * Login user
   * @param {LoginData} credentials - User login credentials
   * @returns {Promise<AuthResponse>} Login response with user data
   */
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/login', credentials);
      return response.data;
    } catch (error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      throw new Error(axiosError.response?.data?.error || 'Login failed. Check credentials');
    }
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/logout');
    } catch (error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      throw new Error(axiosError.response?.data?.error || 'Logout failed');
    }
  }
};
