import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LockOpen } from 'lucide-react';
import { loginUser } from '../store/authSlice';
import { useLocation } from 'react-router-dom';
export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [error, setError] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard'; 
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await dispatch(loginUser(formData)).unwrap();
        navigate(from, { replace: true });

       } catch (error) {
        setError(error.message || 'Login failed');
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-orange-200 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center flex items-center justify-center">
            <LockOpen className="mr-2 text-yellow-500" /> Welcome Back
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-orange-700 mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
                required 
              />
            </div>
            <div>
              <label className="block text-orange-700 mb-2">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your password"
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-300 flex items-center justify-center"
            >
              <LockOpen className="mr-2" /> Login
            </button>
          </form>
          <div className="text-center mt-4">
            <a href="#" className="text-orange-500 hover:underline">Forgot Password?</a>
            <p className="text-gray-600 mt-2">
              Don't have an account? <a href="/signup" className="text-orange-500 hover:underline">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
export default Login;