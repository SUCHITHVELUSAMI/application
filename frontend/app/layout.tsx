import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import './styles/globals.css'; // Correct path to CSS file

const Layout: React.FC<{ children: React.ReactNode; title?: string; description?: string }> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title || 'Your App Title'}</title> {/* Dynamic title */}
        <meta name="description" content={description || 'Your app description'} /> {/* Dynamic description */}
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
