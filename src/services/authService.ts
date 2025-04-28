import axios from 'axios';

const API_URL = 'https://api.futureready.com'; // Will be replaced with actual backend URL when developed

interface RegisterData {
  name: string;
  email: string;
  password: string;
  qualification: string;
}

interface LoginData {
  email: string;
  password: string;
}

// For development, this will mock the API responses
const mockRegister = async (data: RegisterData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful registration
  return {
    success: true,
    user: {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      qualification: data.qualification,
      points: 0,
      completedCourses: [],
    },
    message: 'Registration successful',
  };
};

const mockLogin = async (data: LoginData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful login
  return {
    success: true,
    token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
    user: {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: 'Test User',
      email: data.email,
      points: 250,
      completedCourses: ['aptitude-basics'],
    },
    message: 'Login successful',
  };
};

export const registerUser = async (data: RegisterData) => {
  try {
    // In production, this would be:
    // const response = await axios.post(`${API_URL}/api/auth/register`, data);
    // return response.data;
    
    // For development, use mock
    return await mockRegister(data);
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    // In production, this would be:
    // const response = await axios.post(`${API_URL}/api/auth/login`, data);
    // return response.data;
    
    // For development, use mock
    return await mockLogin(data);
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // In production, this would be:
    // const response = await axios.get(`${API_URL}/api/user/profile`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // return response.data;
    
    // For development, use mock
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      user: JSON.parse(localStorage.getItem('user') || '{}')
    };
  } catch (error) {
    throw error;
  }
};
