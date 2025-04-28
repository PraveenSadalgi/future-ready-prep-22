
import { Course, MockTest, LeaderboardEntry, ApiResponse } from '../types';
import axios from 'axios';

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Technical Interview Preparation',
    description: 'Learn how to tackle technical interviews with confidence',
    image: '/placeholder.svg',
    duration: '4 weeks',
    level: 'Intermediate',
    topics: ['Data Structures', 'Algorithms', 'System Design'],
    instructor: 'John Doe',
    rating: 4.7,
    enrolled: 1250,
    points: 100
  },
  {
    id: 'course-2',
    title: 'Resume Building Workshop',
    description: 'Create a standout resume that gets noticed by recruiters',
    image: '/placeholder.svg',
    duration: '2 weeks',
    level: 'Beginner',
    topics: ['Resume Writing', 'Cover Letters', 'LinkedIn Optimization'],
    instructor: 'Jane Smith',
    rating: 4.5,
    enrolled: 980,
    points: 50
  },
  {
    id: 'course-3',
    title: 'Communication Skills for Interviews',
    description: 'Master the art of effective communication during job interviews',
    image: '/placeholder.svg',
    duration: '3 weeks',
    level: 'Intermediate',
    topics: ['Public Speaking', 'Body Language', 'Answering Difficult Questions'],
    instructor: 'Robert Johnson',
    rating: 4.8,
    enrolled: 1450,
    points: 75
  }
];

// Mock data for mock tests
const mockTests: MockTest[] = [
  {
    id: 'test-1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics',
    duration: 30,
    questions: [
      { id: 'q1', text: 'What is JavaScript?', options: ['A programming language', 'A markup language', 'A database', 'An operating system'], correctAnswer: 0 },
      { id: 'q2', text: 'Which symbol is used for single-line comments in JavaScript?', options: ['#', '//', '/*', '-->'], correctAnswer: 1 }
    ],
    points: 20
  },
  {
    id: 'test-2',
    title: 'SQL Basics',
    description: 'Test your knowledge of SQL queries',
    duration: 25,
    questions: [
      { id: 'q1', text: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Question Language', 'System Query Language', 'Sequential Question Language'], correctAnswer: 0 },
      { id: 'q2', text: 'Which SQL statement is used to extract data from a database?', options: ['EXTRACT', 'SELECT', 'OPEN', 'GET'], correctAnswer: 1 }
    ],
    points: 25
  }
];

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { userId: 'user-1', name: 'Jane Smith', points: 450, rank: 1 },
  { userId: 'user-2', name: 'John Doe', points: 380, rank: 2 },
  { userId: 'user-3', name: 'Mark Wilson', points: 320, rank: 3 },
  { userId: 'user-4', name: 'Sarah Lee', points: 290, rank: 4 },
  { userId: 'user-5', name: 'Robert Brown', points: 260, rank: 5 },
];

// Get all courses
export const getCourses = async (): Promise<ApiResponse> => {
  try {
    // In a real app, this would make an API call to your backend
    // const response = await axios.get('/api/courses');
    // return response.data;
    
    // For now, return mock data
    return {
      success: true,
      courses: mockCourses
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      success: false,
      message: 'Failed to fetch courses'
    };
  }
};

// For backwards compatibility with existing code
export const getAllCourses = getCourses;

// Get course by ID
export const getCourseById = async (id: string): Promise<ApiResponse> => {
  try {
    // In a real app, this would make an API call to your backend
    // const response = await axios.get(`/api/courses/${id}`);
    // return response.data;
    
    // For now, find course in mock data
    const course = mockCourses.find(c => c.id === id);
    if (!course) {
      return {
        success: false,
        message: 'Course not found'
      };
    }
    
    return {
      success: true,
      course
    };
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error);
    return {
      success: false,
      message: 'Failed to fetch course'
    };
  }
};

// Complete a course
export const completeCourse = async (courseId: string): Promise<ApiResponse> => {
  try {
    // In a real app, this would make an API call to your backend
    // const response = await axios.post('/api/users/update-progress', { courseId });
    // return response.data;
    
    // For now, simulate API call
    console.log(`Completing course: ${courseId}`);
    
    // Find course to get points
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) {
      return {
        success: false,
        message: 'Course not found'
      };
    }
    
    // Get user from localStorage
    const userJSON = localStorage.getItem('user');
    if (!userJSON) {
      return {
        success: false,
        message: 'User not authenticated'
      };
    }
    
    const user = JSON.parse(userJSON);
    
    // Update user in localStorage
    if (!user.completedCourses) {
      user.completedCourses = [];
    }
    
    if (!user.completedCourses.includes(courseId)) {
      user.completedCourses.push(courseId);
      user.points = (user.points || 0) + course.points;
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      success: true,
      pointsAwarded: course.points,
      message: `Course completed! You earned ${course.points} points.`
    };
  } catch (error) {
    console.error('Error completing course:', error);
    return {
      success: false,
      message: 'Failed to complete course'
    };
  }
};

// Get mock tests
export const getMockTests = async (): Promise<ApiResponse> => {
  try {
    // In a real app, this would make an API call to your backend
    // const response = await axios.get('/api/mock-tests');
    // return response.data;
    
    // For now, return mock data
    return {
      success: true,
      mockTests: mockTests
    };
  } catch (error) {
    console.error('Error fetching mock tests:', error);
    return {
      success: false,
      message: 'Failed to fetch mock tests'
    };
  }
};

// For backwards compatibility with existing code
export const getAllMockTests = getMockTests;

// Get mock test by ID
export const getMockTestById = async (id: string): Promise<ApiResponse> => {
  try {
    // In a real app, this would make an API call to your backend
    // const response = await axios.get(`/api/mock-tests/${id}`);
    // return response.data;
    
    // For now, find mock test in mock data
    const mockTest = mockTests.find(t => t.id === id);
    if (!mockTest) {
      return {
        success: false,
        message: 'Mock test not found'
      };
    }
    
    return {
      success: true,
      mockTest
    };
  } catch (error) {
    console.error(`Error fetching mock test with id ${id}:`, error);
    return {
      success: false,
      message: 'Failed to fetch mock test'
    };
  }
};

// Submit mock test
export const submitMockTest = async (testId: string, answers: number[]): Promise<ApiResponse> => {
  try {
    // In a real app, this would make an API call to your backend
    // const response = await axios.post('/api/mock-tests/submit', { testId, answers });
    // return response.data;
    
    // For now, simulate API call
    console.log(`Submitting mock test: ${testId} with answers:`, answers);
    
    // Find test
    const test = mockTests.find(t => t.id === testId);
    if (!test) {
      return {
        success: false,
        message: 'Test not found'
      };
    }
    
    // Calculate score
    let correctAnswers = 0;
    test.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = (correctAnswers / test.questions.length) * 100;
    const earnedPoints = Math.round((score / 100) * test.points);
    
    // Update user in localStorage
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      user.points = (user.points || 0) + earnedPoints;
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return {
      success: true,
      score,
      correctAnswers,
      totalQuestions: test.questions.length,
      pointsAwarded: earnedPoints,
      message: `Test submitted! You got ${correctAnswers} out of ${test.questions.length} correct.`
    };
  } catch (error) {
    console.error('Error submitting mock test:', error);
    return {
      success: false,
      message: 'Failed to submit mock test'
    };
  }
};

// Get leaderboard
export const getLeaderboard = async (): Promise<ApiResponse> => {
  try {
    // In a real app, this would make an API call to your backend
    // const response = await axios.get('/api/leaderboard');
    // return response.data;
    
    // For now, return mock data
    return {
      success: true,
      leaderboard: mockLeaderboard
    };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return {
      success: false,
      message: 'Failed to fetch leaderboard'
    };
  }
};
