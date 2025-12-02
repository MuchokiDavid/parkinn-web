import { useAuthStore, UserRole } from '@/stores/authStore';
import { ReactNode } from 'react';
import NotLoggedIn from '@/pages/auth/NotLoggedIn';
import Unauthorised from '@/pages/auth/Unauthorised';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
// console.log(allowedRoles)
  if (!isAuthenticated) {
    return <NotLoggedIn />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Unauthorised />;
  }

  return <>{children}</>;
}
