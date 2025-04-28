import axios from 'axios';

const API_URL = 'https://api.futureready.com'; // Will be replaced with actual backend URL when developed

// Updated mock courses with qualification suggestions
const mockCourses = [
  {
    id: 'aptitude-basics',
    title: 'Aptitude Basics',
    description: 'Master the fundamentals of quantitative aptitude with comprehensive lessons and practice problems.',
    category: 'Aptitude',
    qualification: ['high_school', 'bachelors', 'masters', 'diploma'],
    duration: '10 hours',
    lessons: 12,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/JQBRzsPhw2w',
    thumbnail: 'https://img.youtube.com/vi/JQBRzsPhw2w/maxresdefault.jpg'
  },
  {
    id: 'communication-skills',
    title: 'Professional Communication Skills',
    description: 'Enhance your communication skills with practical examples and exercises.',
    category: 'Communication',
    qualification: ['bachelors', 'masters', 'diploma'],
    duration: '8 hours',
    lessons: 10,
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/8WiDHJ5mJos',
    thumbnail: 'https://img.youtube.com/vi/8WiDHJ5mJos/maxresdefault.jpg'
  },
  {
    id: 'technical-interview',
    title: 'Technical Interview Preparation',
    description: 'Master data structures, algorithms and system design concepts.',
    category: 'Technical',
    qualification: ['bachelors', 'masters'],
    duration: '15 hours',
    lessons: 20,
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/8hly31xKli0',
    thumbnail: 'https://img.youtube.com/vi/8hly31xKli0/maxresdefault.jpg'
  }
];

// Updated mock tests with qualification requirements
const mockTests = [
  {
    id: 'aptitude-test-basic',
    title: 'Basic Aptitude Test',
    description: 'Test your fundamental quantitative and logical reasoning skills.',
    duration: '45 minutes',
    questions: 25,
    difficulty: 'Beginner',
    category: 'Aptitude',
    qualification: ['high_school', 'bachelors', 'masters', 'diploma'],
  },
  {
    id: 'technical-mcq',
    title: 'Technical MCQ Test',
    description: 'Multiple choice questions covering programming fundamentals.',
    duration: '60 minutes',
    questions: 30,
    difficulty: 'Intermediate',
    category: 'Technical',
    qualification: ['bachelors', 'masters'],
  }
];

// Mock leaderboard data
const mockLeaderboard = [
  { id: 'user1', name: 'Sarah Johnson', points: 1250, completedCourses: 5, completedTests: 12 },
  { id: 'user2', name: 'Michael Chen', points: 1180, completedCourses: 4, completedTests: 15 },
  { id: 'user3', name: 'David Rodriguez', points: 950, completedCourses: 3, completedTests: 10 },
  { id: 'user4', name: 'Emily Wilson', points: 820, completedCourses: 3, completedTests: 8 },
  { id: 'user5', name: 'Raj Patel', points: 780, completedCourses: 2, completedTests: 12 },
  { id: 'user6', name: 'Lisa Thompson', points: 720, completedCourses: 3, completedTests: 6 },
  { id: 'user7', name: 'James Lee', points: 650, completedCourses: 2, completedTests: 9 },
  { id: 'user8', name: 'Aisha Khan', points: 600, completedCourses: 2, completedTests: 7 },
  { id: 'user9', name: 'Carlos Mendez', points: 550, completedCourses: 1, completedTests: 10 },
  { id: 'user10', name: 'Priya Sharma', points: 500, completedCourses: 1, completedTests: 8 },
];

export const getCourses = async () => {
  try {
    // In production, this would be:
    // const response = await axios.get(`${API_URL}/api/courses`);
    // return response.data;
    
    // For development, use mock
    await new Promise(resolve => setTimeout(resolve, 800));
    return { courses: mockCourses };
  } catch (error) {
    throw error;
  }
};

export const getMockTests = async () => {
  try {
    // In production, this would be:
    // const response = await axios.get(`${API_URL}/api/mocktests`);
    // return response.data;
    
    // For development, use mock
    await new Promise(resolve => setTimeout(resolve, 800));
    return { mockTests: mockTests };
  } catch (error) {
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    // In production, this would be:
    // const response = await axios.get(`${API_URL}/api/leaderboard`);
    // return response.data;
    
    // For development, use mock
    await new Promise(resolve => setTimeout(resolve, 800));
    return { leaderboard: mockLeaderboard };
  } catch (error) {
    throw error;
  }
};

export const submitMockTest = async (testId: string, score: number) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // In production, this would be:
    // const response = await axios.post(`${API_URL}/api/mocktest`, 
    //   { testId, score },
    //   { headers: { Authorization: `Bearer ${token}` } }
    // );
    // return response.data;
    
    // For development, use mock
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user points in localStorage for the mock
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.points = user.points ? user.points + 150 : 150;
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      success: true,
      message: 'Test submission successful',
      pointsAwarded: 150,
      newTotal: user.points
    };
  } catch (error) {
    throw error;
  }
};

export const completeCourse = async (courseId: string) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // In production, this would be:
    // const response = await axios.post(`${API_URL}/api/course/complete`, 
    //   { courseId },
    //   { headers: { Authorization: `Bearer ${token}` } }
    // );
    // return response.data;
    
    // For development, use mock
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user in localStorage for the mock
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.points = user.points ? user.points + 100 : 100;
    user.completedCourses = user.completedCourses || [];
    if (!user.completedCourses.includes(courseId)) {
      user.completedCourses.push(courseId);
    }
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      success: true,
      message: 'Course completed successfully',
      pointsAwarded: 100,
      newTotal: user.points
    };
  } catch (error) {
    throw error;
  }
};
