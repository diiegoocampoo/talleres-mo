import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function PrivateRoute({ children }) {
  const { isAdmin, loading } = useAuth();
  if (loading) return <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'60vh', color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:3 }}>VERIFICANDO...</div>;
  return isAdmin ? children : <Navigate to="/admin" replace />;
}
