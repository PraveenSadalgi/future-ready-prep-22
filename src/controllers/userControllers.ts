
import { Request, Response } from 'express';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, qualification } = req.body;

  try {
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
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
        message: error.message
      });
    } else {
      res.status(500).json({
        message: 'An unknown error occurred'
      });
    }
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        qualification: user.qualification,
        points: user.points,
        completedCourses: user.completedCourses,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
        message: error.message
      });
    } else {
      res.status(500).json({
        message: 'An unknown error occurred'
      });
    }
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?._id) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }

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
  } catch (error) {
    if (error instanceof Error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
        message: error.message
      });
    } else {
      res.status(500).json({
        message: 'An unknown error occurred'
      });
    }
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?._id) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }

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
        token: generateToken(updatedUser._id.toString()),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
        message: error.message
      });
    } else {
      res.status(500).json({
        message: 'An unknown error occurred'
      });
    }
  }
};

// @desc    Update user points and completed courses
// @route   PUT /api/users/update-progress
// @access  Private
export const updateUserProgress = async (req: AuthRequest, res: Response) => {
  const { points, courseId } = req.body;
  
  try {
    if (!req.user?._id) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }

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
  } catch (error) {
    if (error instanceof Error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
        message: error.message
      });
    } else {
      res.status(500).json({
        message: 'An unknown error occurred'
      });
    }
  }
};
