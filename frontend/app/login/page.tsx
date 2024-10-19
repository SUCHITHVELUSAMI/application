"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for Next.js routing
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Access Next.js router

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.post('http://localhost:3000/login', { mobile, password });
            
            // Handle successful login, e.g., save token and redirect
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token); // Save token in localStorage
                router.push('/todos'); // Redirect to todos page after successful login
            } else {
                console.error('Login failed: Invalid response format');
            }
        } catch (error) {
            console.error('Login failed', error); // Log the error for debugging purposes
            // Optionally: Add logic here to show a message to the user
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
