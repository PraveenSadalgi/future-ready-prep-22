
import { Course, MockTest, LeaderboardEntry, ApiResponse } from '../types';

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to Frontend Development',
    description: 'Learn the basics of HTML, CSS and JavaScript to build modern websites.',
    image: '/placeholder.svg',
    duration: '4 weeks',
    level: 'Beginner',
    topics: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    instructor: 'John Smith',
    rating: 4.8,
    enrolled: 1245,
    points: 100
  },
  {
    id: 'course-2',
    title: 'React.js Fundamentals',
    description: 'Master the popular JavaScript library for building user interfaces.',
    image: '/placeholder.svg',
    duration: '6 weeks',
    level: 'Intermediate',
    topics: ['JSX', 'Components', 'State', 'Props', 'Hooks'],
    instructor: 'Sarah Johnson',
    rating: 4.9,
    enrolled: 980,
    points: 150
  },
  {
    id: 'course-3',
    title: 'Backend Development with Node.js',
    description: 'Create scalable server-side applications with JavaScript.',
    image: '/placeholder.svg',
    duration: '8 weeks',
    level: 'Intermediate',
    topics: ['Node.js', 'Express', 'MongoDB', 'RESTful APIs'],
    instructor: 'Michael Brown',
    rating: 4.7,
    enrolled: 750,
    points: 200
  }
];

// Mock data for mock tests
const mockTests: MockTest[] = [
  {
    id: 'test-1',
    title: 'HTML & CSS Basics',
    description: 'Test your knowledge of fundamental HTML and CSS concepts.',
    duration: 30, // in minutes
    questions: [
      {
        id: 'q1',
        text: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language'
        ],
        correctAnswer: 0
      },
      {
        id: 'q2',
        text: 'Which property is used to change the background color in CSS?',
        options: [
          'color',
          'bgcolor',
          'background-color',
          'background'
        ],
        correctAnswer: 2
      },
      {
        id: 'q3',
        text: 'Which tag is used to define an unordered list in HTML?',
        options: [
          '<ol>',
          '<li>',
          '<ul>',
          '<list>'
        ],
        correctAnswer: 2
      }
    ],
    points: 50
  },
  {
    id: 'test-2',
    title: 'JavaScript Fundamentals',
    description: 'Evaluate your understanding of basic JavaScript concepts.',
    duration: 45,
    questions: [
      {
        id: 'q1',
        text: 'Which keyword is used to declare a variable in JavaScript?',
        options: [
          'var',
          'let',
          'const',
          'All of the above'
        ],
        correctAnswer: 3
      },
      {
        id: 'q2',
        text: 'What will "2" + 2 evaluate to in JavaScript?',
        options: [
          '4',
          '22',
          'Error',
          'undefined'
        ],
        correctAnswer: 1
      },
      {
        id: 'q3',
        text: 'Which method adds an element to the end of an array?',
        options: [
          'push()',
          'pop()',
          'append()',
          'add()'
        ],
        correctAnswer: 0
      }
    ],
    points: 75
  }
];

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { userId: 'user-1', name: 'John Doe', points: 850, rank: 1 },
  { userId: 'user-2', name: 'Jane Smith', points: 720, rank: 2 },
  { userId: 'user-3', name: 'Robert Johnson', points: 695, rank: 3 },
  { userId: 'user-4', name: 'Emily Davis', points: 610, rank: 4 },
  { userId: 'user-5', name: 'Michael Wilson', points: 580, rank: 5 }
];

// Get all courses
export const getAllCourses = async (): Promise<{ courses: Course[] }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { courses: mockCourses };
};

// Get course by ID
export const getCourseById = async (courseId: string): Promise<{ course: Course | null }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const course = mockCourses.find(c => c.id === courseId) || null;
  return { course };
};

// Mark course as completed
export const completeCourse = async (courseId: string): Promise<ApiResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) {
    return { success: false, message: 'Course not found' };
  }
  
  // Get current user
  const userJSON = localStorage.getItem('user');
  if (!userJSON) {
    return { success: false, message: 'User not authenticated' };
  }
  
  const user = JSON.parse(userJSON);
  
  // Check if course is already completed
  if (user.completedCourses.includes(courseId)) {
    return { success: false, message: 'Course already completed' };
  }
  
  // Update user data
  user.completedCourses.push(courseId);
  user.points += course.points;
  
  // Save updated user data to localStorage
  localStorage.setItem('user', JSON.stringify(user));
  
  return { 
    success: true, 
    message: 'Course marked as completed successfully!',
    pointsAwarded: course.points
  };
};

// Get all mock tests
export const getAllMockTests = async (): Promise<{ mockTests: MockTest[] }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { mockTests: mockTests };
};

// Get mock test by ID
export const getMockTestById = async (testId: string): Promise<{ test: MockTest | null }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const test = mockTests.find(t => t.id === testId) || null;
  return { test };
};

// Submit mock test results
export const submitTestResults = async (testId: string, score: number): Promise<ApiResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const test = mockTests.find(t => t.id === testId);
  if (!test) {
    return { success: false, message: 'Test not found' };
  }
  
  // Calculate points based on score percentage
  const totalQuestions = test.questions.length;
  const scorePercentage = (score / totalQuestions) * 100;
  const pointsAwarded = Math.round((scorePercentage / 100) * test.points);
  
  // Get current user
  const userJSON = localStorage.getItem('user');
  if (!userJSON) {
    return { success: false, message: 'User not authenticated' };
  }
  
  const user = JSON.parse(userJSON);
  
  // Update user points
  user.points += pointsAwarded;
  
  // Save updated user data to localStorage
  localStorage.setItem('user', JSON.stringify(user));
  
  return { 
    success: true, 
    message: 'Test results submitted successfully!',
    pointsAwarded
  };
};

// Get leaderboard data
export const getLeaderboard = async (): Promise<{ leaderboard: LeaderboardEntry[] }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { leaderboard: mockLeaderboard };
};
