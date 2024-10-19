"use client";

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Register the user by sending the data to the API
      await axios.post('http://localhost:3000/register', { 
        name, email, mobile, gender, country, hobbies, password 
      });
      // Redirect to login page after successful registration
      router.push('/login');
    } catch (err) {
      const axiosError = err as AxiosError;
      // Display error message from server response or a fallback message
      const errorMessage =
        axiosError.response?.data && typeof axiosError.response.data === 'object'
          ? (axiosError.response.data as { message?: string }).message || 'Failed to register.'
          : 'Failed to register.';
      setError(errorMessage); // Set error message in state
    } finally {
      setLoading(false); // Disable loading state
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if exists */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number"
          required
        />
        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <select 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
          required
        >
          <option value="">Select Country</option>
          <option value="india">India</option>
          <option value="sri_lanka">Sri Lanka</option>
          <option value="japan">Japan</option>
          {/* Add other countries as necessary */}
        </select>
        <input
          type="text"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
          placeholder="Hobbies (e.g., Music, Sports)"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
