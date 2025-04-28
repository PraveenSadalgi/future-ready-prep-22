
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { getCourses, completeCourse } from '@/services/courseService';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses()
  });
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    if (data?.courses) {
      const foundCourse = data.courses.find((c: any) => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        toast.error('Course not found');
        navigate('/courses');
      }
    }
  }, [data, courseId, navigate]);
  
  if (isLoading || !course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-gray-200 mb-4 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-100 mb-8 rounded"></div>
            <div className="w-full h-96 bg-gray-200 rounded-lg mb-8"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    toast.error("Failed to load course. Please try again later.");
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <p className="text-red-500">Failed to load course. Please try again later.</p>
          <Button onClick={() => navigate('/courses')} className="mt-4">
            Back to Courses
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleCompleteCourse = async () => {
    if (!courseId) return;
    
    try {
      setIsCompleting(true);
      const result = await completeCourse(courseId);
      if (result.success) {
        toast.success(`Course completed! You earned ${result.pointsAwarded} points`);
        // Update user in local state
        const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(updatedUser);
      } else {
        toast.error('Failed to mark course as complete');
      }
    } catch (error) {
      toast.error('Error marking course as complete');
      console.error(error);
    } finally {
      setIsCompleting(false);
    }
  };
  
  const isYoutubeVideo = course.videoLink && course.videoLink.includes('youtube.com');
  const isCompleted = user?.completedCourses?.includes(courseId);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/courses')}
            className="mb-4"
          >
            ← Back to Courses
          </Button>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <div className="flex items-center mb-6">
            <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded mr-4">
              {course.category}
            </span>
            <span className="text-gray-600">Duration: {course.duration}</span>
          </div>
          <p className="text-lg">{course.description}</p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            {isYoutubeVideo ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  className="w-full h-[500px] rounded-lg"
                  src={course.videoLink}
                  title={course.title}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold mb-4">Course Content</h3>
                <p>This course includes {course.lessons} lessons.</p>
                <div className="mt-6">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="rounded-lg max-h-[500px] mx-auto"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleCompleteCourse}
            disabled={isCompleting || isCompleted}
            className="px-8"
          >
            {isCompleted 
              ? 'Completed' 
              : isCompleting 
                ? 'Marking as complete...' 
                : 'Mark as Complete'
            }
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
