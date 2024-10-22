import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import './styles/globals.css'; // Correct path to CSS file

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Your App Title</title>
        <meta name="description" content="Your app description" />
      </Head>
      <html lang="en">
        <body>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
            <Link href="/todos">Todos</Link>
          </nav>
          {children}
        </body>
      </html>
    </>
  );
};

export default Layout;
