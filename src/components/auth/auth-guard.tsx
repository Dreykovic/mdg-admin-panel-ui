// src/components/auth/AuthGuard.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

/**
 * Component that guards routes, redirecting to login if not authenticated
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children, isAuthenticated }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and store the intended location for redirect after login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
