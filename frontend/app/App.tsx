import React from 'react';
import ErrorBoundary from './todos/components/ErrorBoundary';
import Head from 'next/head';
import './styles/globals.css'; // Import global styles

interface MyAppProps {
  Component: React.FC; // Type for the component being rendered
  pageProps: Record<string, any>; // More flexible typing for pageProps
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const { title, description } = pageProps; // Assuming you pass title and description in pageProps

  return (
    <>
      <Head>
        <title>{title || 'Your App Title'}</title> {/* Use dynamic title if provided */}
        <meta name="description" content={description || 'Your app description'} /> {/* Use dynamic description if provided */}
        <link rel="icon" href="/favicon.ico" /> {/* Optional: Add a favicon */}
      </Head>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
