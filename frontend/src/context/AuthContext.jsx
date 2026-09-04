import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const saved = sessionStorage.getItem('adminToken');
    if (saved) {
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/verify`, { headers: { Authorization: `Bearer ${saved}` } })
        .then(r => r.json()).then(d => { if (d.valid) { setToken(saved); setAdmin(d.admin); } else sessionStorage.removeItem('adminToken'); })
        .catch(() => sessionStorage.removeItem('adminToken')).finally(() => setLoading(false));
    } else setLoading(false);
  }, []);
  const login = (t, a) => { sessionStorage.setItem('adminToken', t); setToken(t); setAdmin(a); };
  const logout = () => { sessionStorage.removeItem('adminToken'); setToken(null); setAdmin(null); };
  return <AuthContext.Provider value={{ admin, token, loading, login, logout, isAdmin: !!admin }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
