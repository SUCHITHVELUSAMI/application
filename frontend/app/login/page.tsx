"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ mobile: string; password: string; }>();
  const [errorMessage, setErrorMessage] = useState<string>(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter();

  const onSubmit = async (formData: { mobile: string; password: string; }) => {
    setLoading(true); // Set loading to true
    setErrorMessage(''); // Reset error message before attempting to login
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', formData);

      // Debugging: log the API response to check its structure
      console.log('Login Response:', response.data);

      // Adjust the key to match the actual API response (update as necessary)
      const token = response.data.accessToken?.accessToken; // Correct extraction of the token

      if (token) {
        // Store the token in localStorage and redirect
        localStorage.setItem('token', token); // Storing the token in localStorage
        router.push('/todos');
      } else {
        throw new Error('Token not provided in the response');
      }
    } catch (error: any) {
      // Handle different error scenarios
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
      } else {
        setErrorMessage('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false); // Reset loading
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          type="text" 
          placeholder="Mobile" 
          {...register('mobile', { required: 'Mobile number is required' })} 
        />
        {errors.mobile && <p className="error-message">{errors.mobile.message}</p>}
        
        <input 
          type="password" 
          placeholder="Password" 
          {...register('password', { required: 'Password is required' })} 
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
    </div>
  );
};

export default Login;
