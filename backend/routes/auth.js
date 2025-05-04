import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../services/email.service.js';
import authController from '../controllers/auth.controller.js';
const { loginUser, logout } = authController;
import supabase from '../config/supabase.js';
import dotenv from 'dotenv';
import verifyToken from '../middleware/auth.middleware.js'; // Update verifyToken import to use default export

dotenv.config();

const router = express.Router();
const SALT_ROUNDS = 10;

/**
 * Initialize Firestore collections with proper schema
 * @param {Object} db - Firestore database instance
 */
async function initializeCollections(db) {
  try {
    // Create collections if they don't exist
    const collections = ['Users', 'Resumes', 'Templates', 'ResumeSections'];
    for (const collection of collections) {
      const collRef = db.collection(collection);
      const doc = await collRef.get();
      if (!doc) {
        console.log(`Created ${collection} collection`);
      }
    }
  } catch (error) {
    console.error('Error initializing collections:', error);
  }
}

/**
 * Create a new user in Firestore with proper schema
 * @param {Object} db - Firestore database instance
 * @param {Object} userData - User data to be stored
 * @returns {Promise<Object>} - Created user document
 */
async function createUserInFirestore(db, userData) {
  try {
    const { email, fullName, hashedPassword } = userData;
    
    // Create user document following schema
    const userDocument = {
      uid: crypto.randomBytes(16).toString('hex'),
      email,
      fullName,
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: false,
      verificationToken: crypto.randomBytes(32).toString('hex'),
      hashedPassword
    };

    // Add user to Firestore
    const userRef = db.collection('Users');
    const newUser = await userRef.add(userDocument);
    
    return { id: newUser.id, ...userDocument };
  } catch (error) {
    console.error('Error creating user in Firestore:', error);
    throw error;
  }
}

/**
 * Sign up a new user with email verification
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - User's email
 * @param {string} req.body.fullName - User's full name
 * @param {string} req.body.password - User's password
 * @returns {Promise<Object>} - User data and verification message
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) throw error;
    
    res.status(201).json({
      message: 'User created successfully. Please check your email for verification.',
      user: data.user
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Verify email with token
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.token - Verification token
 * @returns {Promise<Object>} - Verification status
 */
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ error: 'Verification token is required' });
    }

    const db = req.app.locals.db;
    const userRef = db.collection('Users');
    const userSnapshot = await userRef.where('verificationToken', '==', token).get();
    
    if (userSnapshot.empty) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.isVerified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }
    
    try {
      await userDoc.ref.update({
        isVerified: true,
        verificationToken: null,
        updatedAt: new Date()
      });

      // Send welcome email with login link
      const loginLink = 'http://localhost:3000/login';
      await sendVerificationEmail(userData.email, loginLink);

      res.json({ 
        message: 'Email verified successfully. You can now log in to your account.',
        loginUrl: loginLink
      });
    } catch (updateError) {
      console.error('Error updating user verification status:', updateError);
      return res.status(500).json({ error: 'Failed to verify email. Please try again.' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Log in an existing user
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @returns {Promise<Object>} - User data and session token
 */
router.post('/login', loginUser);
router.post('/logout', verifyToken, logout);

export default router;
