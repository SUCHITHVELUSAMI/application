'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({ mobile: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>(''); // State for error messages
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData);
      // Store the token (if necessary) and redirect
      localStorage.setItem('token', response.data.accessToken); // Update the key to match your response
      router.push('/todos');
    } catch (error: any) {
      // Handle different error scenarios
      if (error.response) {
        // If there's a response from the server
        setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
      } else {
        // If there's no response from the server
        setErrorMessage('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="mobile" 
          placeholder="Mobile" 
          value={formData.mobile} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
    </div>
  );
};

export default Login;
