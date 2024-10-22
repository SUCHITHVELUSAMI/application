import React from 'react';
import ErrorBoundary from './todos/components/ErrorBoundary';
import Head from 'next/head';
import './styles/globals.css'; // Import global styles

interface MyAppProps {
  Component: React.FC; // Type for the component being rendered
  pageProps: Record<string, any>; // More flexible typing for pageProps
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Your App Title</title>
        <meta name="description" content="Your app description" />
        <link rel="icon" href="/favicon.ico" /> {/* Optional: Add a favicon */}
      </Head>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
