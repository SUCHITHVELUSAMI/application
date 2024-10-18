import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode;
    onLogout: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onLogout }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Example: check for a token
        const isAuthenticated = !!token; // Convert token existence to boolean

        if (!isAuthenticated) {
            // If not authenticated, redirect to login or handle logout
            onLogout();
            router.push('/login');
        }
    }, [onLogout, router]);

    return <>{children}</>; // Render children if authenticated
};

export default ProtectedRoute;
