import verifyToken from '../middleware/auth.middleware.js';
import { 
  createResume, 
  getUserResumes, 
  getResume, 
  updateResume, 
  deleteResume 
} from '../controllers/resume.controller.js';
import express from 'express';

const router = express.Router();

router.post('/', verifyToken, createResume);
router.get('/', verifyToken, getUserResumes);
router.get('/:id', verifyToken, getResume);
router.put('/:id', verifyToken, updateResume);
router.delete('/:id', verifyToken, deleteResume);

export default router;