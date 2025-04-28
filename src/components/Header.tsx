
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token') !== null;
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="font-bold text-2xl gradient-text">FutureReady</div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-gray-600 hover:text-primary ${location.pathname === '/' ? 'font-medium text-primary' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`text-gray-600 hover:text-primary ${location.pathname === '/about' ? 'font-medium text-primary' : ''}`}>
            About Us
          </Link>
          <Link to="/courses" className={`text-gray-600 hover:text-primary ${location.pathname === '/courses' || location.pathname.startsWith('/course/') ? 'font-medium text-primary' : ''}`}>
            Courses
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="hidden md:inline-flex"
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="hidden md:inline-flex"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
