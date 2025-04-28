
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { getCourses } from '@/services/courseService';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Course } from '@/types';

interface CourseData {
  id: string;
  title: string;
  description: string;
  category: string;
  qualification: string[];
  duration: string;
  lessons: number;
  image: string;
  videoLink: string;
  thumbnail: string;
}

const Courses = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses()
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <CardHeader>
                  <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 rounded mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    toast.error("Failed to load courses. Please try again later.");
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Courses</h1>
          <p className="text-red-500">Failed to load courses. Please try again later.</p>
        </div>
      </Layout>
    );
  }

  const courses = data?.courses || [];
  const categories = ['All', ...new Set(courses.map((course: CourseData) => course.category))];
  
  const filteredCourses = data?.courses.filter((course: CourseData) => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesQualification = !user?.qualification || course.qualification.includes(user.qualification);
    return matchesCategory && matchesQualification;
  }) || [];

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Aptitude':
        return <BookOpen className="mr-2" size={18} />;
      case 'Technical':
        return <Code className="mr-2" size={18} />;
      case 'Communication':
        return <MessageSquare className="mr-2" size={18} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Recommended Courses</h1>
        <p className="text-gray-600 mb-8">Courses tailored to your qualification and interests</p>
        
        <div className="mb-8">
          <Tabs defaultValue="All" onValueChange={setActiveCategory}>
            <TabsList className="mb-4">
              {categories.map((category: string) => (
                <TabsTrigger key={category} value={category} className="flex items-center">
                  {getCategoryIcon(category)}
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCourses.map((course: CourseData) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {course.videoLink && course.videoLink.includes('youtube.com') ? (
                  <img 
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {course.videoLink && course.videoLink.includes('youtube.com') && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <CardHeader className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
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
                <Button 
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="bg-primary text-white w-full py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                  {user?.completedCourses?.includes(course.id) 
                    ? 'Continue Learning' 
                    : 'Start Course'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
