export interface User {
  email: string;
  name: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
  userId?: string;
}