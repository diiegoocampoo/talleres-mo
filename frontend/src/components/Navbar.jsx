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
      <div className="container nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px' }}>
        <Link to="/" className="nav-logo-link" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, textDecoration: 'none' }}>
          <img src="/logo.png" alt="Logo" className="nav-logo-img" style={{ width: 46, height: 46, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />
          <div>
            <div className="nav-logo-text" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.15rem', letterSpacing: 2, color: 'white', lineHeight: 1.2 }}>TALLERES<br /><span style={{ color: 'var(--red)' }}>MECÁNICOS</span> M.O.</div>
            <div className="nav-logo-sub" style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: 3, color: 'var(--steel)', textTransform: 'uppercase', marginTop: 2 }}>Maliaño · Cantabria</div>
          </div>
        </Link>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {links.map(l => <NavLink key={l.to} to={l.to} end={l.to === '/'} style={({ isActive }) => ({ ...base, ...(isActive ? active : {}) })}>{l.label}</NavLink>)}
          <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
          <button onClick={toggleTheme} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-steel)', borderRadius: 6, padding: '7px 10px', color: 'white', fontSize: '1rem' }}>{theme === 'dark' ? '☀' : '☾'}</button>
          <a href="https://www.instagram.com/mecanicosmoexport/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-steel)', borderRadius: 6, padding: '7px 9px', color: 'white', display: 'flex', alignItems: 'center', marginLeft: 6 }}>
            <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@mecanicosmoexport" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-steel)', borderRadius: 6, padding: '7px 9px', color: 'white', display: 'flex', alignItems: 'center', marginLeft: 6 }}>
            <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
          </a>
          {isAdmin && <><Link to="/admin/panel" className="btn btn-primary" style={{ padding: '7px 16px', fontSize: '0.82rem', marginLeft: 8 }}>Panel</Link><button onClick={logout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, color: 'rgba(255,255,255,0.5)', padding: '7px 12px', fontSize: '0.82rem' }}>Salir</button></>}
        </div>
        <div className="nav-mobile-actions" style={{ display: 'none', gap: 8, alignItems: 'center', marginLeft: 'auto', marginRight: 12 }}>
          <a href="tel:669851778" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-steel)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>📞</a>
          <a href="mailto:mecanicosm.o.25@gmail.com" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-steel)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.1rem' }}>✉️</a>
        </div>
        <button className="nav-burger" onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: '1.4rem', padding: 8 }}>{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <div style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)', padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(l => <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} style={({ isActive }) => ({ padding: '11px 14px', borderRadius: 6, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: isActive ? 'var(--red)' : 'rgba(255,255,255,0.75)', background: isActive ? 'rgba(214,40,40,0.08)' : 'transparent' })}>{l.label}</NavLink>)}
          {!isAdmin && <NavLink to="/admin" onClick={() => setOpen(false)} style={{ padding: '11px 14px', borderRadius: 6, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 8 }}>Panel Administrativo</NavLink>}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 8, paddingTop: 12 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: 3, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', padding: '0 10px', marginBottom: 10 }}>Síguenos</div>
            <div style={{ display: 'flex', gap: 10, padding: '0 10px' }}>
              <a href="https://www.instagram.com/mecanicosmoexport/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.1rem' }}>
                <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@mecanicosmoexport" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.1rem' }}>
                <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
              </a>
            </div>
          </div>
          <button onClick={toggleTheme} style={{ marginTop: 8, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 6, color: 'white', textAlign: 'left', fontFamily: 'var(--font-display)', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.9rem' }}>{theme === 'dark' ? '☀ Modo claro' : '☾ Modo oscuro'}</button>
        </div>
      )}
      <style>{`
        @media(max-width:820px){
          .nav-links{display:none!important}
          .nav-burger{display:block!important}
          .nav-mobile-actions{display:flex!important}
        }
        @media(max-width:500px){
          .nav-container{padding:8px 12px!important}
          .nav-logo-img{width:36px!important;height:36px!important}
          .nav-logo-text{font-size:0.92rem!important;letter-spacing:1px!important}
          .nav-logo-sub{font-size:0.48rem!important;letter-spacing:2px!important}
          .nav-logo-link{gap:8px!important}
          .nav-mobile-actions a{width:32px!important;height:32px!important;font-size:0.9rem!important}
          .nav-mobile-actions{gap:6px!important;margin-right:8px!important}
        }
      `}</style>
    </nav>
  );
}
