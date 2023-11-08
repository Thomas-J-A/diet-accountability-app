import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

interface PrivateRouteProps {
  redirectPath: string;
  children: ReactNode;
}

const PrivateRoute = ({ redirectPath = '/', children }: PrivateRouteProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    // User not signed in, redirect to specified path
    return (
      <Navigate to={redirectPath} replace state={{ from: location.pathname }} />
    );
  }

  // User signed in, render child component (page)
  return children;
};

export default PrivateRoute;
