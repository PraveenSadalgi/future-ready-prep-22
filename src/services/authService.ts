
import { User, ApiResponse } from '../types';
import axios from 'axios';

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  qualification: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterCredentials): Promise<ApiResponse> => {
  try {
    // For development without a backend
    // Simulating a successful registration
    console.log("Registering user with data:", userData);
    
    // In a real app, this would be a real API call to your backend
    // const response = await axios.post('/api/users', userData);
    // return response.data;
    
    // Simulate successful registration
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      qualification: userData.qualification,
      points: 0,
      completedCourses: [],
    };
    
    // Generate a mock token
    const mockToken = `mock-token-${Date.now()}`;
    
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', mockToken);
    
    // Return success response
    return {
      success: true,
      user: mockUser,
      token: mockToken,
      message: 'Registration successful!'
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Registration failed. Please try again.'
    };
  }
};

export const loginUser = async (credentials: LoginCredentials): Promise<ApiResponse> => {
  try {
    // For development without a backend
    // Simulating a successful login
    console.log("Logging in user with credentials:", credentials);
    
    // In a real app, this would be a real API call to your backend
    // const response = await axios.post('/api/users/login', credentials);
    // return response.data;
    
    // Mock validation
    if (credentials.email && credentials.password) {
      // Create mock user data
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: 'Test User',
        email: credentials.email,
        qualification: 'Bachelor\'s Degree',
        points: 250,
        completedCourses: ['course-1', 'course-3'],
      };
      
      // Generate a mock token
      const mockToken = `mock-token-${Date.now()}`;
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      
      // Return success response
      return {
        success: true,
        user: mockUser,
        token: mockToken,
        message: 'Login successful!'
      };
    } else {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Login failed. Please try again.'
    };
  }
};

// Convert the JavaScript file to TypeScript
export const generateToken = (id: string): string => {
  // In a real app, this would use JWT to generate a token
  return `mock-jwt-token-${id}-${Date.now()}`;
};

export const getUserProfile = async (): Promise<ApiResponse> => {
  try {
    // In a real app, this would be a real API call to your backend
    // const response = await axios.get('/api/users/profile');
    // return response.data;
    
    // Get user from localStorage
    const userJSON = localStorage.getItem('user');
    if (!userJSON) {
      return {
        success: false,
        message: 'Not authenticated'
      };
    }
    
    const user = JSON.parse(userJSON);
    
    return {
      success: true,
      user
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
      message: 'Failed to fetch user profile'
    };
  }
};
