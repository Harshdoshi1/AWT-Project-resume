import express from 'express';
import dashboardController from '../controllers/dashboard.controller.js';
import verifyToken from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply authentication middleware to all dashboard routes
router.use(verifyToken);

// Get dashboard statistics
router.get('/stats', dashboardController.getDashboardStats);

// Add a new deadline
router.post('/deadlines', dashboardController.addDeadline);

export default router;
