// /app/page.tsx
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto text-center my-4">
      <h1 className="text-3xl font-bold">Welcome to the Todo App</h1>
      <p className="mt-2">
        This app helps you manage your tasks efficiently. Please{' '}
        <a href="/login" className="text-blue-500 hover:underline">log in</a> or{' '}
        <a href="/register" className="text-blue-500 hover:underline">register</a> to get started.
      </p>
    </div>
  );
};

export default HomePage;
