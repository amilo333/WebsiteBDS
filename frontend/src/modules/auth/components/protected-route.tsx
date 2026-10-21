import { Navigate } from 'react-router'
import { hasAuthSession } from '../common/services/auth-session'
import type { ProtectedRouteProps } from '../common/types/auth'

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!hasAuthSession()) {
    return <Navigate replace to="/dang-nhap" />
  }

  return children
}
