
// Mock data for courses
const mockCourses = [
  {
    id: 'course-1',
    title: 'Aptitude Mastery',
    description: 'Master the fundamentals of quantitative aptitude with comprehensive lessons.',
    category: 'Aptitude',
    qualification: ['high_school', 'bachelors', 'masters'],
    duration: '10 hours',
    lessons: 12,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: '',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
  },
  {
    id: 'course-2',
    title: 'Coding Interview Preparation',
    description: 'Prepare for technical interviews with data structures and algorithms.',
    category: 'Technical',
    qualification: ['bachelors', 'masters', 'phd'],
    duration: '15 hours',
    lessons: 20,
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
  },
  {
    id: 'course-3',
    title: 'Effective Communication',
    description: 'Enhance your verbal and written communication skills for professional success.',
    category: 'Communication',
    qualification: ['high_school', 'bachelors', 'masters', 'phd', 'diploma', 'certificate'],
    duration: '6 hours',
    lessons: 8,
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    videoLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
  }
];

// Mock data for mock tests
const mockTests = [
  {
    id: 'aptitude-test-1',
    title: 'Quantitative Aptitude Test',
    description: 'Test your numerical and logical reasoning skills with this comprehensive aptitude assessment.',
    category: 'Aptitude',
    duration: '45',
    questions: 5,
    difficulty: 'Intermediate'
  },
  {
    id: 'basic-coding-test',
    title: 'Basic Web Development Test',
    description: 'Assess your knowledge of HTML, CSS, and JavaScript fundamentals.',
    category: 'Technical',
    duration: '30',
    questions: 3,
    difficulty: 'Beginner'
  },
  {
    id: 'advanced-dsa',
    title: 'Advanced Data Structures & Algorithms',
    description: 'Challenge yourself with complex problems on data structures and algorithms.',
    category: 'Technical',
    duration: '60',
    questions: 3,
    difficulty: 'Advanced'
  }
];

// Mock leaderboard data
const mockLeaderboard = [
  { 
    id: 'user-1', 
    name: 'John Smith', 
    points: 1250, 
    completedCourses: 5,
    completedTests: 8
  },
  { 
    id: 'user-2', 
    name: 'Emma Johnson', 
    points: 980, 
    completedCourses: 4,
    completedTests: 7
  },
  { 
    id: 'user-3', 
    name: 'Michael Chen', 
    points: 870, 
    completedCourses: 3,
    completedTests: 6
  },
  { 
    id: 'user-4', 
    name: 'Sophia Rodriguez', 
    points: 750, 
    completedCourses: 3,
    completedTests: 5
  },
  { 
    id: 'user-5', 
    name: 'James Wilson', 
    points: 650, 
    completedCourses: 2,
    completedTests: 4
  }
];

export const getCourses = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ courses: mockCourses });
    }, 500);
  });
};

export const getMockTests = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ mockTests: mockTests });
    }, 500);
  });
};

export const getLeaderboard = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ leaderboard: mockLeaderboard });
    }, 500);
  });
};

export const completeCourse = async (courseId: string) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Check if course is already completed
      if (userData.completedCourses && userData.completedCourses.includes(courseId)) {
        resolve({ 
          success: true,
          message: 'Course was already completed',
          pointsAwarded: 0
        });
        return;
      }
      
      // Add course to completed courses
      const completedCourses = userData.completedCourses || [];
      completedCourses.push(courseId);
      
      // Award points
      const pointsAwarded = 100;
      const updatedPoints = (userData.points || 0) + pointsAwarded;
      
      // Update user data
      const updatedUser = {
        ...userData,
        completedCourses,
        points: updatedPoints
      };
      
      // Save updated user data to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      resolve({ 
        success: true,
        message: 'Course completed successfully',
        pointsAwarded: pointsAwarded
      });
    }, 500);
  });
};

export const submitMockTest = async (testId: string, score: number) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Award points based on score
      const pointsAwarded = Math.round(score * 1.5);
      const updatedPoints = (userData.points || 0) + pointsAwarded;
      
      // Update user data
      const updatedUser = {
        ...userData,
        points: updatedPoints
      };
      
      // Save updated user data to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      resolve({ 
        success: true,
        message: 'Test submitted successfully',
        pointsAwarded: pointsAwarded,
        score: score
      });
    }, 500);
  });
};
