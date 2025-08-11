import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useIsAuthenticated } from '@/hooks';
import { Loading } from '@/components/common';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/login'
}) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useIsAuthenticated();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Verificando autenticación..." />
      </div>
    );
  }

  // Si requiere autenticación y no está autenticado, redirigir
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Si no requiere autenticación pero está autenticado, redirigir al dashboard
  if (!requireAuth && isAuthenticated) {
    return (
      <Navigate 
        to="/" 
        replace 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;