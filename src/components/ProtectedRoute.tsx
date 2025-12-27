import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { firebaseUser, user, isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neo-bg">
        <div className="text-center">
          <div className="w-16 h-16 bg-neo-green border-4 border-neo-black flex items-center justify-center font-display text-3xl shadow-neo-lg mx-auto mb-4 animate-pulse">
            F
          </div>
          <p className="font-mono text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!firebaseUser) {
    // Store the intended role for post-login redirect
    localStorage.setItem('selectedRole', allowedRole);
    return <Navigate to="/login" replace />;
  }

  // Authenticated in Firebase, but profile not ready yet (common right after first sign-in)
  if (!user || !isAuthenticated || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neo-bg">
        <div className="text-center">
          <div className="w-16 h-16 bg-neo-green border-4 border-neo-black flex items-center justify-center font-display text-3xl shadow-neo-lg mx-auto mb-4 animate-pulse">
            F
          </div>
          <p className="font-mono text-sm text-gray-600">Setting up your workspace...</p>
        </div>
      </div>
    );
  }

  if (role !== allowedRole) {
    // User is authenticated but trying to access wrong role area
    // Redirect to their correct dashboard
    if (role === UserRole.MERCHANT) {
      return <Navigate to="/merchant" replace />;
    } else if (role === UserRole.CUSTOMER) {
      return <Navigate to="/customer" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
