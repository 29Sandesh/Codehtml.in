import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageSkeleton from './PageSkeleton';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();

  const isAuthCallback = 
    window.location.hash.includes('access_token=') || 
    window.location.hash.includes('id_token=') || 
    window.location.hash.includes('error=');

  if (loading || isAuthCallback) {
    return <PageSkeleton />;
  }

  if (!user || !role) {
    // If trying to access admin pages, redirect to admin login
    if (allowedRoles.includes('admin')) {
      return <Navigate to="/admin/login" replace />;
    }
    // If trying to access partner pages, redirect to partner signup/login
    return <Navigate to="/partner" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // User is logged in but doesn't have the right role
    if (role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/partner/dashboard" replace />;
  }

  return children;
}
