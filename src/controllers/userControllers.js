
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, qualification } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    qualification,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      qualification: user.qualification,
      points: user.points,
      completedCourses: user.completedCourses,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      qualification: user.qualification,
      points: user.points,
      completedCourses: user.completedCourses,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      qualification: user.qualification,
      points: user.points,
      completedCourses: user.completedCourses,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.qualification = req.body.qualification || user.qualification;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      qualification: updatedUser.qualification,
      points: updatedUser.points,
      completedCourses: updatedUser.completedCourses,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update user points and completed courses
// @route   PUT /api/users/update-progress
// @access  Private
const updateUserProgress = async (req, res) => {
  const { points, courseId } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    if (points) {
      user.points += points;
    }
    
    if (courseId && !user.completedCourses.includes(courseId)) {
      user.completedCourses.push(courseId);
    }

    const updatedUser = await user.save();

    res.json({
      points: updatedUser.points,
      completedCourses: updatedUser.completedCourses,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  updateUserProgress,
};
