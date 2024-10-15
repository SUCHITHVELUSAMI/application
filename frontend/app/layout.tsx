import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Todo App</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a> | <a href="/login">Login</a> | <a href="/register">Register</a> | <a href="/todos">Todos</a>
        </nav>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
