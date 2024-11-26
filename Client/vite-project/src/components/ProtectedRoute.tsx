import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  element, 
  requiredPermission 
}) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Add permission check if needed
  if (requiredPermission) {
    // Implement permission check logic here
    // Return <Navigate to="/unauthorized" /> if permission check fails
  }

  return <>{element}</>;
};

export default ProtectedRoute; 