// app/layout.tsx
import Link from 'next/link';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>My Todo App</h1>
          <nav>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} My Todo App</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
