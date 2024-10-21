// /frontend/app/App.tsx
import React from 'react';
import ErrorBoundary from './todos/components/ErrorBoundary';

interface MyAppProps {
  Component: React.FC; // Type for the component being rendered
  pageProps: any;      // Type for the page props; you can replace `any` with a more specific type if known
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
};

export default MyApp;
