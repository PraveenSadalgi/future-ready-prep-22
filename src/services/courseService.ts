
import axios from 'axios';

const API_URL = 'https://api.futureready.com'; // Will be replaced with actual backend URL when developed

// For development, this will mock the courses data
const mockCourses = [
  {
    id: 'aptitude-basics',
    title: 'Aptitude Basics',
    description: 'Master the fundamentals of quantitative aptitude with comprehensive lessons and practice problems.',
    category: 'Aptitude',
    duration: '10 hours',
    lessons: 12,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/JQBRzsPhw2w',
  },
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning',
    description: 'Develop critical thinking and problem-solving skills with logical reasoning exercises and techniques.',
    category: 'Aptitude',
    duration: '8 hours',
    lessons: 10,
    image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/Yk1HipdhdCc',
  },
  {
    id: 'coding-interview-prep',
    title: 'Coding Interview Prep',
    description: 'Prepare for technical interviews with data structures, algorithms and common coding problems.',
    category: 'Technical',
    duration: '15 hours',
    lessons: 20,
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/8hly31xKli0',
  },
  {
    id: 'effective-communication',
    title: 'Effective Communication',
    description: 'Enhance your verbal and written communication skills for professional success.',
    category: 'Communication',
    duration: '6 hours',
    lessons: 8,
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/8WiDHJ5mJos',
  },
  {
    id: 'system-design',
    title: 'System Design Fundamentals',
    description: 'Learn how to design scalable systems and ace the system design interview.',
    category: 'Technical',
    duration: '12 hours',
    lessons: 15,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/SqcXvc3ZmRU',
  },
  {
    id: 'group-discussions',
    title: 'Group Discussion Skills',
    description: 'Master the art of group discussions with practical techniques and mock sessions.',
    category: 'Communication',
    duration: '5 hours',
    lessons: 7,
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/YvYYzgmaqrM',
  },
];

// For development, this will mock the mock tests data
const mockTests = [
  {
    id: 'aptitude-test-1',
    title: 'Aptitude Test 1',
    description: 'Test your quantitative aptitude skills with this comprehensive assessment.',
    duration: '60 minutes',
    questions: 30,
    difficulty: 'Beginner',
    category: 'Aptitude',
  },
  {
    id: 'coding-challenge-1',
    title: 'Coding Challenge 1',
    description: 'Solve programming problems ranging from easy to medium difficulty.',
    duration: '90 minutes',
    questions: 5,
    difficulty: 'Intermediate',
    category: 'Technical',
  },
  {
    id: 'communication-assessment',
    title: 'Communication Assessment',
    description: 'Evaluate your verbal reasoning and written communication abilities.',
    duration: '45 minutes',
    questions: 25,
    difficulty: 'Beginner',
    category: 'Communication',
  },
  {
    id: 'advanced-aptitude',
    title: 'Advanced Aptitude',
    description: 'Challenge yourself with complex aptitude problems from past company tests.',
    duration: '75 minutes',
    questions: 35,
    difficulty: 'Advanced',
    category: 'Aptitude',
  },
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
