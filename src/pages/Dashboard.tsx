
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/Layout';
import { getCourses, getMockTests, getLeaderboard } from '@/services/courseService';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  completedCourses: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  lessons: number;
  image: string;
  videoLink: string;
}

interface MockTest {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  difficulty: string;
  category: string;
}

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  completedCourses: number;
  completedTests: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
    }

    const fetchData = async () => {
      try {
        const [coursesData, mockTestsData, leaderboardData] = await Promise.all([
          getCourses(),
          getMockTests(),
          getLeaderboard()
        ]);
        
        setCourses(coursesData.courses);
        setMockTests(mockTestsData.mockTests);
        setLeaderboard(leaderboardData.leaderboard);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome and Stats Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome{user ? `, ${user.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-gray-600 mb-6">
            Track your progress and continue your job preparation journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Points Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                    <h3 className="text-3xl font-bold">{user?.points || 0}</h3>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Courses Completed Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Courses Completed</p>
                    <h3 className="text-3xl font-bold">{user?.completedCourses?.length || 0}</h3>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Rank Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Rank</p>
                    <h3 className="text-3xl font-bold">
                      {user ? 
                        leaderboard.findIndex(item => item.id === user.id) + 1 || 'N/A' 
                        : 'N/A'}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="courses">
          <TabsList className="mb-6">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="mockTests">Mock Tests</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          
          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle>{course.title}</CardTitle>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                        {course.category}
                      </span>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6 px-6 pt-0">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>{course.lessons} lessons</span>
                      <span>{course.duration}</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="bg-primary text-white w-full py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      {user?.completedCourses?.includes(course.id) 
                        ? 'Continue Learning' 
                        : 'Start Course'}
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Mock Tests Tab */}
          <TabsContent value="mockTests">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTests.map((test) => (
                <Card key={test.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{test.title}</CardTitle>
                        <CardDescription className="mt-2">{test.description}</CardDescription>
                      </div>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                        {test.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-gray-500 mb-6">
                      <div>
                        <p><strong>Duration:</strong> {test.duration}</p>
                        <p><strong>Questions:</strong> {test.questions}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          test.difficulty === 'Beginner' 
                            ? 'bg-green-100 text-green-800' 
                            : test.difficulty === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {test.difficulty}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/mock-test/${test.id}`)}
                      className="bg-primary text-white w-full py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Take Test
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  See how you rank among other learners on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-6">Rank</th>
                        <th className="text-left py-4 px-6">Name</th>
                        <th className="text-center py-4 px-6">Points</th>
                        <th className="text-center py-4 px-6">Courses</th>
                        <th className="text-center py-4 px-6">Tests</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, index) => (
                        <tr 
                          key={entry.id} 
                          className={`border-b ${
                            user && entry.id === user.id 
                              ? 'bg-primary/5' 
                              : ''
                          }`}
                        >
                          <td className="py-4 px-6 font-medium">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6">
                            {entry.name}{user && entry.id === user.id ? ' (You)' : ''}
                          </td>
                          <td className="py-4 px-6 text-center font-medium">{entry.points}</td>
                          <td className="py-4 px-6 text-center">{entry.completedCourses}</td>
                          <td className="py-4 px-6 text-center">{entry.completedTests}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
