// /frontend/app/page.tsx
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Todo Application</h1>
      <p>Please register or log in to get started!</p>
      <Link href="/register">
        <button>Register</button>
      </Link>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
