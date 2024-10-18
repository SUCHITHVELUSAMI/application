// Mark this component as a Client Component
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Update this import
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { mobile, password });
            // Handle successful login here, e.g., save token and redirect
            localStorage.setItem('token', response.data.token); // Assuming token is in response data
            router.push('/todos'); // Redirect to todos page
        } catch (error) {
            console.error('Login failed', error);
            // Handle error, e.g., show message to user
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
