import React from 'react';
import Link from 'next/link';
import './styles/globals.css'; // Ensure you have appropriate styles defined

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Todo Application</h1>
      <p>This application helps you manage your tasks efficiently. Please register or log in to get started!</p>
      <div className="button-group">
        <Link href="/register" passHref>
          <button className="action-button" aria-label="Register for a new account">
            Register
          </button>
        </Link>
        <Link href="/login" passHref>
          <button className="action-button" aria-label="Login to your account">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
