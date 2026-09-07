import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const isOpen = day >= 1 && day <= 5 && mins >= 420 && mins < 1020;
  const isSaturday = day === 6;
  const dotColor = isOpen ? '#4ade80' : isSaturday ? '#fbbf24' : '#f87171';
  const badgeText = isOpen ? 'Abierto ahora' : isSaturday ? 'Cerrado · solo cita previa' : 'Cerrado ahora';
  return (
    <footer style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)', padding: '60px 0 28px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', letterSpacing: 3, color: 'white', marginBottom: 12 }}><img src="/logo.png" alt="Logo" style={{ width: 24, height: 24, borderRadius: 3, objectFit: 'cover', marginRight: 6 }} /> TALLERES M.O.</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>Taller mecánico y exportación de vehículos. Maliaño, Cantabria.</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="tel:669851778" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>📞 Llamar</a>
              <a href="https://wa.me/34669851778" target="_blank" rel="noopener noreferrer" className="btn btn-steel" style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}><svg viewBox="0 0 448 512" width="14" height="14" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.4 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.4-29.8-17-41.1-4.5-10.9-9.1-9.5-12.4-9.6-3.2-.1-6.9-.1-10.6-.1-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>WhatsApp</a>
              <a href="https://www.instagram.com/mecanicosmoexport/" target="_blank" rel="noopener noreferrer" className="btn btn-steel" style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}><svg viewBox="0 0 448 512" width="14" height="14" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>Instagram</a>
              <a href="https://www.tiktok.com/@mecanicosmoexport" target="_blank" rel="noopener noreferrer" className="btn btn-steel" style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}><svg viewBox="0 0 448 512" width="14" height="14" fill="currentColor"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>TikTok</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: 3, color: 'var(--red)', textTransform: 'uppercase', marginBottom: 16 }}>Navegación</div>
            {[['/', 'Inicio'], ['/taller', 'Taller'], ['/exportacion', 'Exportación'], ['/catalogo', 'Catálogo']].map(([to, label]) => <Link key={to} to={to} style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', letterSpacing: 1, textTransform: 'uppercase' }}>{label}</Link>)}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: 3, color: 'var(--red)', textTransform: 'uppercase', marginBottom: 16 }}>Contacto</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>📍 C. Alday, 36, 39600 Maliaño</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>📞 669 85 17 78</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: `1px solid ${dotColor}55`, borderRadius: 999, padding: '4px 10px', marginBottom: 10, fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: dotColor }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
              {badgeText}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>🕐 Horario</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[['Lunes – Viernes', '7:00 – 17:00'], ['Sábado', 'Bajo cita previa'], ['Domingo', 'Cerrado']].map(([d, h]) => (
                <div key={d} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{d}</span>
                  <span style={{ color: 'var(--text-muted)', textAlign: 'right' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Talleres Mecánicos M.O.</span>
          <Link to="/admin" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: 2, textTransform: 'uppercase' }}>Admin</Link>
        </div>
      </div>
    </footer>
  );
}
