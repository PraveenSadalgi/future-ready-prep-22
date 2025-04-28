import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hero-pattern py-12 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Prepare for Your Dream Job
              </h1>
              <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
                Master the skills employers are looking for with our comprehensive job preparation platform. Practice aptitude, technical skills, and communication to stand out from the crowd.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80"
                alt="Students studying" 
                className="rounded-lg shadow-2xl w-full max-w-[500px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Why Choose FutureReady?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Our comprehensive platform offers everything you need to prepare for your dream job
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Courses</h3>
              <p className="text-gray-600 mb-4">
                Access expertly crafted courses for aptitude, technical skills, and communication.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mock Tests</h3>
              <p className="text-gray-600 mb-4">
                Practice with industry-standard mock tests to gauge your preparation level.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">
                Learn at your own pace with our comprehensive video tutorial library.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Preview Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Popular Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Explore our most popular courses to kickstart your job preparation
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Course 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
                alt="Aptitude Basics" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Aptitude Basics</h3>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Aptitude</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Master the fundamentals of quantitative aptitude with comprehensive lessons.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">12 lessons • 10 hours</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/courses')}
                  >
                    View Course
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Course 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
                alt="Coding Interview Prep" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Coding Interview Prep</h3>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Technical</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Prepare for technical interviews with data structures and algorithms.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">20 lessons • 15 hours</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/courses')}
                  >
                    View Course
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Course 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
                alt="Effective Communication" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Effective Communication</h3>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Communication</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Enhance your verbal and written communication skills for professional success.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">8 lessons • 6 hours</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/courses')}
                  >
                    View Course
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 md:mt-10">
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/courses')}
              className="w-full sm:w-auto"
            >
              View All Courses
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-brand-purple to-brand-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Accelerate Your Career?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
            Join thousands of job seekers who have transformed their careers with FutureReady.
          </p>
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100"
            onClick={() => navigate('/register')}
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">About FutureReady</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our mission is to prepare candidates for success in today's competitive job market
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
              <h3 className="text-2xl font-semibold mb-4">Our Goal</h3>
              <p className="text-gray-600 mb-4">
                In today's competitive world, job preparation requires more than just theoretical knowledge — it demands practical readiness. At FutureReady, we've built an integrated platform where users can access curated study materials and video tutorials to build their aptitude, technical knowledge, and communication skills.
              </p>
              <p className="text-gray-600 mb-4">
                Our platform includes interactive aptitude tests, communication round assessments, and mock interview experiences that can be conducted through AI-driven simulations or with real mentors. We aim to create a structured, user-friendly system that helps candidates prepare effectively for campus placements and job interviews.
              </p>
              <p className="text-gray-600">
                Join us and become future-ready with opportunities to innovate, learn, and grow in your professional journey.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
                alt="Team working together" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-semibold mb-8 text-center">Our Leadership Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* CEO */}
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                  alt="CEO" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold">Sarah Johnson</h4>
                <p className="text-primary font-medium mb-2">Chief Executive Officer</p>
                <p className="text-gray-600 text-sm">
                  With 15+ years in education technology, Sarah leads our vision to transform job preparation.
                </p>
              </div>
              
              {/* CTO */}
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                  alt="CTO" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold">Michael Chen</h4>
                <p className="text-primary font-medium mb-2">Chief Technology Officer</p>
                <p className="text-gray-600 text-sm">
                  Michael oversees our technical strategy and ensures our platform delivers an exceptional learning experience.
                </p>
              </div>
              
              {/* COO */}
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                  alt="COO" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold">Priya Sharma</h4>
                <p className="text-primary font-medium mb-2">Chief Operating Officer</p>
                <p className="text-gray-600 text-sm">
                  Priya leads our day-to-day operations and ensures we continuously improve our educational offerings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
