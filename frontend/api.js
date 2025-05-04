/**
 * Base API configuration
 */
const API_BASE_URL = 'http://localhost:5000/api/auth';

/**
 * Sign up a new user
 * @param {string} fullName - User's full name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} Response data containing user information
 * @throws {Error} If signup fails
 */
export async function signUp(fullName, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, email, password }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Signup failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Signup error:', error);
        // Provide more specific feedback for CORS errors
        if (error.message === 'Failed to fetch') {
            console.error('Possible CORS issue - check if the server is running and CORS is properly configured',error);
        }
        throw error;
    }
}

/**
 * Verify email with token
 * @param {string} token - Verification token from email
 * @returns {Promise<Object>} Response data from verification
 * @throws {Error} If verification fails
 */
export async function verifyEmail(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/verify-email?token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Email verification failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Email verification error:', error);
        throw error;
    }
}

/**
 * Log in an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} Response data containing user information and session
 * @throws {Error} If login fails
 */
export async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
        }

        const data = await response.json();
        
        // Store user data in localStorage
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

/**
 * Log out the current user
 * Removes user data from localStorage
 */
export function logout() {
    localStorage.removeItem('user');
}

/**
 * Get the current logged-in user
 * @returns {Object|null} The current user data or null if not logged in
 */
export function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}
