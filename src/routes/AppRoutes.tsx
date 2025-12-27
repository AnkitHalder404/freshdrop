import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import MerchantDashboard from '../pages/merchant/MerchantDashboard';
import CustomerHome from '../pages/customer/CustomerHome';
import ProtectedRoute from '../components/ProtectedRoute';
import { UserRole } from '../types';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Merchant Routes */}
      <Route 
        path="/merchant" 
        element={
          <ProtectedRoute allowedRole={UserRole.MERCHANT}>
            <MerchantDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Customer Routes */}
      <Route 
        path="/customer" 
        element={
          <ProtectedRoute allowedRole={UserRole.CUSTOMER}>
            <CustomerHome />
          </ProtectedRoute>
        } 
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
