
// User Types
export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  qualification: string;
  points: number;
  completedCourses: string[];
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  topics: string[];
  instructor: string;
  rating: number;
  enrolled: number;
  points: number;
}

// Mock Test Types
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface MockTest {
  id: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
  points: number;
}

// Leaderboard Types
export interface LeaderboardEntry {
  userId: string;
  name: string;
  points: number;
  rank: number;
}

// API Response Types
export interface ApiResponse {
  success: boolean;
  message?: string;
  pointsAwarded?: number;
  [key: string]: any;
}
