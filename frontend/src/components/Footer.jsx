import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)', padding: '60px 0 28px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', letterSpacing: 3, color: 'white', marginBottom: 12 }}><img src="/logo.png" alt="Logo" style={{ width: 24, height: 24, borderRadius: 3, objectFit: 'cover', marginRight: 6 }} /> TALLERES M.O.</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>Taller mecánico y exportación de vehículos. Maliaño, Cantabria.</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <a href="tel:669851778" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>📞 Llamar</a>
              <a href="https://wa.me/34669851778" target="_blank" rel="noopener noreferrer" className="btn btn-steel" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>WhatsApp</a>
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
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>🕐 Lun–Vie: 8:00 – 17:00</p>
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
