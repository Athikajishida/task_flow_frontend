import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../store/authSlice';
import { LockOpen, User, Mail } from 'lucide-react';


export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',  // Changed from username to name
    email: '',
    password: '',
    password_confirmation: ''  // Changed from confirmPassword
  });
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const result = await dispatch(signupUser({
        user: formData  // Wrap the data in a 'user' object
      })).unwrap();
      
      // On successful signup, redirect to dashboard or home
      navigate('/dashboard');
    } catch (err) {
      // Handle signup errors
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  // useEffect(() => {
  //   console.log('Axios Base URL:', axios.defaults.baseURL);
  //   console.log('Vite Env Variables:', import.meta.env);
    
  //   // Test a simple axios call
  //   const testApiConnection = async () => {
  //     try {
  //       const response = await axios.get('/ping');
  //       console.log('API Connection Test:', response.data);
  //     } catch (error) {
  //       console.error('Axios Connection Error:', error);
        
  //       // More detailed error logging
  //       if (error.response) {
  //         console.log('Error Data:', error.response.data);
  //         console.log('Error Status:', error.response.status);
  //         console.log('Error Headers:', error.response.headers);
  //       } else if (error.request) {
  //         console.log('Error Request:', error.request);
  //       } else {
  //         console.log('Error Message:', error.message);
  //       }
  //     }
  //   };
  
  //   testApiConnection();
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-orange-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center flex items-center justify-center">
          <User className="mr-2 text-yellow-500" /> Create Account
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-orange-700 mb-2">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your full name"
              required 
            />
          </div>
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
              placeholder="Create a password"
              required 
            />
          </div>
          <div>
            <label className="block text-orange-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Confirm your password"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-300 flex items-center justify-center"
          >
            <LockOpen className="mr-2" /> Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-orange-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;