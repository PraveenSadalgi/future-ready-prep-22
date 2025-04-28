
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { getCourses } from '@/services/courseService';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

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
  const categories = ['All', ...new Set(courses.map((course: Course) => course.category))];
  
  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter((course: Course) => course.category === activeCategory);

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
        <h1 className="text-3xl font-bold mb-2">Courses</h1>
        <p className="text-gray-600 mb-8">Explore our courses to enhance your job preparation skills</p>
        
        <div className="mb-8">
          <Tabs defaultValue="All" onValueChange={setActiveCategory}>
            <TabsList className="mb-4">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="flex items-center">
                  {getCategoryIcon(category)}
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCourses.map((course: Course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
      </div>
    </Layout>
  );
};

export default Courses;
