"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure this import is correct
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // State for error messages
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error message

        try {
            // Update the URL to the correct backend port
            const response = await axios.post('http://localhost:3001/auth/login', { mobile, password });

            console.log('Response:', response.data); // Log response for debugging

            // Check for access token in the response
            if (response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken); // Save token in localStorage
                console.log('Redirecting to todos page');
                router.push('/todos'); // Redirect to todos page after successful login
            } else {
                setError('Login failed: Invalid response format'); // Set error message
            }
        } catch (error: any) {
            // Handle specific error responses
            if (error.response && error.response.status === 404) {
                setError('Login failed: User not found'); // Set specific error message
            } else if (error.response && error.response.status === 401) {
                setError('Login failed: Incorrect password'); // Handle incorrect password case
            } else {
                setError('Login failed: An unexpected error occurred'); // Handle other errors
            }
            console.error('Login failed', error); // Log the error for debugging
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
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
        </div>
    );
};

export default LoginPage;
