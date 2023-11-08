import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

interface PublicRouteProps {
  redirectPath: string;
  children: ReactNode;
}

const PublicRoute = ({ redirectPath, children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    // User already signed in, redirect to specified path
    return <Navigate to={redirectPath} replace />;
  }

  // User not signed in, render child component
  return children;
};

export default PublicRoute;
