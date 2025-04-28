
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  authUser, 
  getUserProfile, 
  updateUserProfile,
  updateUserProgress 
} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/update-progress').put(protect, updateUserProgress);

module.exports = router;
