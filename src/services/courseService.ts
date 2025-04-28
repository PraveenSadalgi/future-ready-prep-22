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

const mockQuestions = {
  'aptitude-test-1': [
    {
      id: 'q1',
      question: 'If a train travels at 60 km/h, how far will it travel in 2.5 hours?',
      options: ['120 km', '150 km', '180 km', '200 km'],
      answer: '150 km'
    },
    {
      id: 'q2',
      question: 'Find the next number in the sequence: 2, 5, 10, 17, 26, ...',
      options: ['35', '36', '37', '38'],
      answer: '37'
    },
    {
      id: 'q3',
      question: 'If 6 workers can build a wall in 12 days, how many days will it take 9 workers to build the same wall?',
      options: ['8', '6', '9', '18'],
      answer: '8'
    },
    {
      id: 'q4',
      question: 'A shopkeeper sells an item at 20% profit. If the cost price is Rs. 1500, what is the selling price?',
      options: ['Rs. 1700', 'Rs. 1800', 'Rs. 1900', 'Rs. 2000'],
      answer: 'Rs. 1800'
    },
    {
      id: 'q5',
      question: 'What is the probability of getting a sum of 7 when two dice are rolled?',
      options: ['1/6', '1/9', '1/12', '5/36'],
      answer: '1/6'
    }
  ],
  'basic-coding-test': [
    {
      id: 'q1',
      question: 'What is the output of: console.log(typeof [])?',
      options: ['array', 'object', 'undefined', 'null'],
      answer: 'object'
    },
    {
      id: 'q2',
      question: 'Which method is used to add an element at the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      answer: 'push()'
    },
    {
      id: 'q3',
      question: 'What does CSS stand for?',
      options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
      answer: 'Cascading Style Sheets'
    }
  ],
  'advanced-dsa': [
    {
      id: 'q1',
      question: 'What is the time complexity of quicksort in the average case?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      answer: 'O(n log n)'
    },
    {
      id: 'q2',
      question: 'Which data structure is best suited for implementing a priority queue?',
      options: ['Array', 'Linked List', 'Heap', 'Stack'],
      answer: 'Heap'
    },
    {
      id: 'q3',
      question: 'What is the space complexity of DFS (Depth-First Search)?',
      options: ['O(1)', 'O(n)', 'O(V+E)', 'O(b^d)'],
      answer: 'O(V+E)'
    }
  ],
  'quantitative-aptitude': [
    {
      id: 'qa1',
      question: 'What is 15% of 400?',
      options: ['40', '60', '50', '80'],
      answer: '60'
    },
    {
      id: 'qa2',
      question: 'A car travels at 60 kmph for 2 hours and then at 40 kmph for 3 hours. What is the average speed?',
      options: ['48 kmph', '50 kmph', '45 kmph', '52 kmph'],
      answer: '48 kmph'
    },
    {
      id: 'qa3',
      question: 'Find the missing number: 2, 6, 12, 20, ?',
      options: ['30', '28', '32', '26'],
      answer: '30'
    }
  ],
  'logical-reasoning': [
    {
      id: 'lr1',
      question: 'If LIVE is coded as 3957 and LOVE is coded as 3957, then CODE is coded as?',
      options: ['8647', '8467', '6847', '4867'],
      answer: '8647'
    },
    {
      id: 'lr2',
      question: 'In a row of children, Ravi is 7th from the left and 4th from the right. How many children are there in the row?',
      options: ['9', '10', '11', '12'],
      answer: '10'
    },
    {
      id: 'lr3',
      question: 'If + means ×, - means +, × means ÷ and ÷ means -, then 15 - 3 + 6 × 2 = ?',
      options: ['24', '30', '36', '48'],
      answer: '36'
    }
  ]
};

// Updated mock tests with qualification requirements
const mockTests = [
  {
    id: 'aptitude-test-1',
    title: 'Basic Aptitude Test',
    description: 'Test your fundamental quantitative and logical reasoning skills.',
    duration: '45',
    questions: 5,
    difficulty: 'Beginner',
    category: 'Aptitude',
    qualification: ['high_school', 'bachelors', 'masters', 'diploma'],
  },
  {
    id: 'quantitative-aptitude',
    title: 'Quantitative Aptitude Test',
    description: 'Advanced mathematical and analytical problems.',
    duration: '30',
    questions: 3,
    difficulty: 'Intermediate',
    category: 'Aptitude',
    qualification: ['bachelors', 'masters'],
  },
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning Test',
    description: 'Test your logical thinking and problem-solving abilities.',
    duration: '45',
    questions: 3,
    difficulty: 'Intermediate',
    category: 'Aptitude',
    qualification: ['high_school', 'bachelors', 'masters'],
  },
  {
    id: 'basic-coding-test',
    title: 'Basic Coding Test',
    description: 'Test your fundamental programming knowledge.',
    duration: '60',
    questions: 3,
    difficulty: 'Intermediate',
    category: 'Technical',
    qualification: ['bachelors', 'masters'],
  },
  {
    id: 'advanced-dsa',
    title: 'Advanced DSA Test',
    description: 'Complex data structures and algorithms problems.',
    duration: '90',
    questions: 3,
    difficulty: 'Advanced',
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
