
import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-300px)] flex flex-col items-center justify-center py-16">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Page Not Found</h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <Button asChild size="lg">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
