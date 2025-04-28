
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

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

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}`, data);
    return {
      success: true,
      user: response.data,
      message: 'Registration successful',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed',
    };
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    
    // Store token in localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    
    return {
      success: true,
      token: response.data.token,
      user: response.data,
      message: 'Login successful',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
    };
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return {
      user: response.data
    };
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data: { name?: string; email?: string; password?: string; qualification?: string }) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.put(`${API_URL}/profile`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Update localStorage with new user data
    localStorage.setItem('user', JSON.stringify(response.data));
    
    return {
      success: true,
      user: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Update failed',
    };
  }
};

export const updateUserProgress = async (data: { points?: number; courseId?: string }) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.put(`${API_URL}/update-progress`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Update user data in localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.points = response.data.points;
    user.completedCourses = response.data.completedCourses;
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      success: true,
      pointsAwarded: data.points,
      newTotal: response.data.points,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update progress',
    };
  }
};
