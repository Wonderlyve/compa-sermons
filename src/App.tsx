
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { SermonProvider } from "@/context/SermonContext";

import Home from "@/pages/Home";
import Categories from "@/pages/Categories";
import CategoryDetail from "@/pages/CategoryDetail";
import Radio from "@/pages/Radio";
import SermonDetail from "@/pages/SermonDetail";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Programme from "@/pages/Programme";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sermons from "@/pages/Sermons";
import Favorites from "@/pages/Favorites";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import DailyBread from "@/pages/DailyBread";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SermonProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:id" element={<CategoryDetail />} />
              <Route path="/radio" element={<Radio />} />
              <Route path="/sermon/:id" element={<SermonDetail />} />
              <Route path="/programme" element={<Programme />} />
              <Route path="/sermons" element={<Sermons />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/daily-bread" element={<DailyBread />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </SermonProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
