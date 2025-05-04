import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resume.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

import supabase from './config/supabase.js';
import verifyToken from './middleware/auth.middleware.js';
import { validateSignup, validateLogin } from './middleware/validation.middleware.js';
import authController from './controllers/auth.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ['https://yourdomain.com'] 
  : ['http://localhost:3000', 'http://localhost:5001', 'http://localhost:5000', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/resume', verifyToken, resumeRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.locals.supabase = supabase; // Make supabase accessible to all routes

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error response as JSON
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      details: req.app.get('env') === 'development' ? err : {}
    }
  });
});

export default app;
