
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import axios from "axios";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import MockTest from "./pages/MockTest";

const queryClient = new QueryClient();

// Configure axios defaults
axios.defaults.baseURL = "https://api.futureready.com"; // Will be replaced with actual backend URL
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add auth token to requests if it exists
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const App = () => {
  // Check token validity on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // In a real app, this would validate the token with the backend
      // For now, we'll just check if it exists
      console.log("Token found in localStorage");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses" 
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/course/:courseId" 
              element={
                <ProtectedRoute>
                  <CourseDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/mock-test/:testId" 
              element={
                <ProtectedRoute>
                  <MockTest />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
