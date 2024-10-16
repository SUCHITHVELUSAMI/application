"use client";  // Mark this component as a Client Component

import React from 'react';
import { useRouter } from 'next/navigation';  // Correct for App Router

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear the token from localStorage
    router.push('/login');  // Redirect to the login page
  };

  return (
    <html lang="en">
      <head>
        <title>Todo App</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a> | <a href="/login">Login</a> | <a href="/register">Register</a> | <a href="/todos">Todos</a>
          <button onClick={handleLogout}>Logout</button>  {/* Logout button */}
        </nav>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
