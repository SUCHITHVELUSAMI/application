import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode;
    onLogout: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onLogout }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const isAuthenticated = !!token; // Check if token exists

        if (!isAuthenticated) {
            // If not authenticated, call onLogout and redirect to login page
            onLogout();
            router.push('/login');
        }
    }, [onLogout, router]);

    return <>{children}</>; // Render children if authenticated, otherwise redirect
};

export default ProtectedRoute;
