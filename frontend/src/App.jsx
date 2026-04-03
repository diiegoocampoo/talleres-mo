import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Taller from './pages/Taller';
import Exportacion from './pages/Exportacion';
import Catalogo from './pages/Catalogo';
import CarDetailPage from './pages/CarDetailPage';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import WhatsAppButton from './components/WhatsAppButton';
import './index.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Toaster position="top-right" toastOptions={{ style: { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' } }} />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/taller" element={<Taller />} />
                <Route path="/exportacion" element={<Exportacion />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/catalogo/:id" element={<CarDetailPage />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
                <Route path="*" element={<div style={{ textAlign: 'center', padding: '120px 20px', fontFamily: 'var(--font-display)', letterSpacing: 3 }}><div style={{ fontSize: '5rem', marginBottom: 16 }}>404</div><div style={{ fontSize: '1.5rem', textTransform: 'uppercase', marginBottom: 24 }}>Página no encontrada</div><a href="/" style={{ color: 'var(--red)' }}>Volver →</a></div>} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
