import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Header />
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        {/* <Route path="/footer" element={<Footer />} />
        <Route path="/header" element={<Header />} /> */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;