
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 gradient-text">About FutureReady</h1>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-lg mb-4">
                  At FutureReady, our mission is to empower job seekers with the essential skills and knowledge needed to excel in today's competitive job market.
                </p>
                <p className="mb-4">
                  We believe that effective job preparation goes beyond theoretical knowledge—it requires practical readiness, confidence, and hands-on experience with the types of challenges candidates face during the hiring process.
                </p>
                <p>
                  Through our comprehensive platform, we aim to bridge the gap between academic learning and professional requirements, helping candidates showcase their true potential to prospective employers.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Comprehensive Learning</h3>
                  <p>
                    We've designed our platform to cover all essential aspects of job preparation, including aptitude development, technical skills, and communication abilities—the three pillars of successful job interviews.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Practical Experience</h3>
                  <p>
                    Beyond theoretical knowledge, our platform offers interactive mock tests, simulated interviews, and real-world problem-solving exercises that reflect actual job interview scenarios.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Community Learning</h3>
                  <p>
                    We foster a collaborative environment where learners can connect, compete on leaderboards, and learn from each other's experiences, creating a supportive community of job seekers.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Structured Progress</h3>
                  <p>
                    Our platform provides a structured learning path with clear milestones, achievements, and progress tracking, ensuring that users stay motivated and can measure their improvement over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4">
                  We envision a world where every job seeker has the tools, resources, and confidence to present their best self during the job application process, regardless of their background or prior opportunities.
                </p>
                <p>
                  By democratizing access to high-quality job preparation materials and creating innovative practice environments, we aim to level the playing field and help talented candidates connect with the opportunities they deserve.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="mb-6">
              FutureReady was founded by a team of professionals with backgrounds in HR, education technology, and career development, who recognized the need for a more comprehensive approach to job preparation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                  <p className="text-gray-600">CEO & Founder</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="font-semibold text-lg">Michael Chen</h3>
                  <p className="text-gray-600">CTO</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="font-semibold text-lg">Priya Sharma</h3>
                  <p className="text-gray-600">Head of Content</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
