import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 10); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn); }, []);
  const links = [{ to: '/', label: 'Inicio' }, { to: '/taller', label: <span translate="no">Taller</span> }, { to: '/exportacion', label: 'Exportación' }, { to: '/catalogo', label: 'Catálogo' }];
  const base = { padding: '8px 14px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', borderBottom: '2px solid transparent', transition: 'var(--transition)' };
  const active = { color: 'var(--red)', borderBottom: '2px solid var(--red)' };
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 200, background: 'var(--bg-nav)', borderBottom: `1px solid ${scrolled ? 'rgba(214,40,40,0.25)' : 'rgba(255,255,255,0.05)'}`, boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.6)' : 'none', transition: 'all 0.3s ease' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 85 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 52, height: 52, borderRadius: 6, objectFit: 'cover' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', letterSpacing: 2, color: 'white', lineHeight: 1.1 }}>TALLERES<br/><span style={{ color: 'var(--red)' }}>MECÁNICOS</span> M.O.</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', letterSpacing: 4, color: 'var(--steel)', textTransform: 'uppercase', marginTop: 2 }}>Maliaño · Cantabria</div>
          </div>
        </Link>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {links.map(l => <NavLink key={l.to} to={l.to} end={l.to === '/'} style={({ isActive }) => ({ ...base, ...(isActive ? active : {}) })}>{l.label}</NavLink>)}
          <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
          <button onClick={toggleTheme} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-steel)', borderRadius: 6, padding: '7px 10px', color: 'white', fontSize: '1rem' }}>{theme === 'dark' ? '☀' : '☾'}</button>
          {isAdmin && <><Link to="/admin/panel" className="btn btn-primary" style={{ padding: '7px 16px', fontSize: '0.82rem', marginLeft: 8 }}>Panel</Link><button onClick={logout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, color: 'rgba(255,255,255,0.5)', padding: '7px 12px', fontSize: '0.82rem' }}>Salir</button></>}
        </div>
        <div className="nav-mobile-actions" style={{ display: 'none', gap: 10, alignItems: 'center', marginLeft: 'auto', marginRight: 15 }}>
          <a href="tel:669851778" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-steel)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.1rem' }}>📞</a>
          <a href="mailto:talleresmo@gmail.com" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-steel)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem' }}>✉️</a>
        </div>
        <button className="nav-burger" onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: '1.4rem', padding: 8 }}>{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <div style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)', padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(l => <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} style={({ isActive }) => ({ padding: '11px 14px', borderRadius: 6, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: isActive ? 'var(--red)' : 'rgba(255,255,255,0.75)', background: isActive ? 'rgba(214,40,40,0.08)' : 'transparent' })}>{l.label}</NavLink>)}
          {!isAdmin && <NavLink to="/admin" onClick={() => setOpen(false)} style={{ padding: '11px 14px', borderRadius: 6, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', borderTop:'1px solid rgba(255,255,255,0.05)', marginTop: 8 }}>Panel Administrativo</NavLink>}
          <button onClick={toggleTheme} style={{ marginTop: 8, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 6, color: 'white', textAlign: 'left', fontFamily: 'var(--font-display)', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.9rem' }}>{theme === 'dark' ? '☀ Modo claro' : '☾ Modo oscuro'}</button>
        </div>
      )}
      <style>{`
        @media(max-width:820px){
          .nav-links{display:none!important}
          .nav-burger{display:block!important}
          .nav-mobile-actions{display:flex !important}
        }
      `}</style>
    </nav>
  );
}
