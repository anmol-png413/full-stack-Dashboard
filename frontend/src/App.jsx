import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="nav-bg shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center text-white">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-white/20 flex items-center justify-center"> 
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8H9L12 2Z" fill="white" opacity=".95"/><path d="M12 22L9 16H15L12 22Z" fill="white" opacity=".85"/></svg>
                </div>
                <span className="font-bold logo-gradient">Fullstack App</span>
              </Link>
              <div className="space-x-4">
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              </div>
            </div>
          </nav>
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<div className="text-center mt-20"><h1 className="text-3xl font-bold">Welcome</h1></div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
