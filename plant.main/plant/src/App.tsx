import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { EducationContextProvider } from '@/contexts/educationContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认设置为已认证以便展示功能

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <EducationContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        </Routes>
      </EducationContextProvider>
    </AuthContext.Provider>
  );
}
