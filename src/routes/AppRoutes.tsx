import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ProtectedRoute } from '@/components/layout';
import { LoginPage, RegisterPage, DashboardPage, ProductsPage } from '@/pages';
import { useIsAuthenticated } from '@/hooks';

const AppRoutes: React.FC = () => {
  const { data: isAuthenticated, isLoading } = useIsAuthenticated();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } 
      />
      <Route 
        path="/register" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
      
      {/* Fallback Route */}
      <Route 
        path="*" 
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        } 
      />
    </Routes>
  );
};

export default AppRoutes;