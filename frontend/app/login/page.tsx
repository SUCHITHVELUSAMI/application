// /frontend/app/login/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({ mobile: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      // Store the token (if necessary) and redirect
      localStorage.setItem('token', response.data.access_token);
      router.push('/todos');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
