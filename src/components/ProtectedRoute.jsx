import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }){
  const { user, loading } = useAuth()
  if (loading) return <div className="container py-5 text-center">Loading...</div>
  return user ? children : <Navigate to="/auth" replace />
}
