import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'board_member' | 'applicant';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
        return;
      }

      if (requiredRole && profile?.role !== requiredRole) {
        navigate('/dashboard');
        return;
      }
    }
  }, [user, profile, loading, requiredRole, navigate]);

  // ✅ Show loader while loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // ✅ If not logged in or role doesn't match, don't flash UI
  if (!user || (requiredRole && profile?.role !== requiredRole)) {
    return null;
  }

  // ✅ All good, show the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
