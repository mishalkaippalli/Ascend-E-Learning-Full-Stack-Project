
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import type { UserRole } from '../types/auth'

interface ProtectedRouteProps {
  allowedRoles: UserRole[]
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()

  
  if (isLoading) {                                                                                       // Wait until refresh-token session restoration has finished.
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-primary">
        <p role="status">Checking your session...</p>
      </div>
    )
  }

  // Send unauthenticated visitors to login.
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  // Redirect authenticated users away from areas their role cannot access.
  if (!allowedRoles.includes(user.role as UserRole)) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />
    }

    if (user.role === 'publisher') {
      return <Navigate to="/publisher/dashboard" replace />
    }

    return <Navigate to="/explore" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
