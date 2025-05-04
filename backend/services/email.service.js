import nodemailer from 'nodemailer';
import { promisify } from 'util';

// Create reusable transporter object using SMTP transport
const createTransporter = async () => {
  try {
    // Validate required SMTP settings
    const requiredSettings = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
    const missingSettings = requiredSettings.filter(setting => !process.env[setting]);
    
    if (missingSettings.length > 0) {
      throw new Error(`Missing required SMTP settings: ${missingSettings.join(', ')}`);
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log('SMTP connection established successfully');
    return transporter;
  } catch (error) {
    console.error('Error creating mail transporter:', error);
    throw new Error('Failed to initialize email service: ' + error.message);
  }
};

/**
 * Sends verification email to user
 * @param {string} email - User's email address
 * @param {string} verificationLink - Email verification link
 * @returns {Promise<void>}
 */
export const sendVerificationEmail = async (email, verificationLink) => {
  if (!email || !verificationLink) {
    console.error('Missing required parameters:', { email: !!email, verificationLink: !!verificationLink });
    throw new Error('Email and verification link are required');
  }

  try {
    console.log('Attempting to send verification email to:', email);
    console.log('Using verification link:', verificationLink);
    
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Your App'}" <${process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Verify your email address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Please click the button below to verify your email address:</p>
          <a 
            href="${verificationLink}"
            style="
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;"
          >
            Verify Email
          </a>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    const sendMailAsync = promisify(transporter.sendMail).bind(transporter);
    await sendMailAsync(mailOptions);
    console.log('Verification email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email: ' + error.message);
  }
};