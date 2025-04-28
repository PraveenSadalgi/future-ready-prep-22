
import express from 'express';
import { 
  registerUser, 
  authUser, 
  getUserProfile, 
  updateUserProfile,
  updateUserProgress 
} from '../controllers/userControllers';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/update-progress').put(protect, updateUserProgress);

export default router;
