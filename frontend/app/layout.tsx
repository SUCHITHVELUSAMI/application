// /frontend/app/layout.tsx

import React from 'react';
import './styles/globals.css'; // Correct path to CSS file

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
