"use client"; // Ensure this is a client component

import React, { ReactNode } from 'react';
import '../styles/globals.css'; // Adjust the path according to your project structure

interface RootLayoutProps {
  children: ReactNode; // Define the type for children
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your App Title</title> {/* Replace with your app's title */}
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout; // Make sure this line is here
