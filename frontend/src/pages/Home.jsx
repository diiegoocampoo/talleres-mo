import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { getFeaturedCars } from '../services/api';
import CarCard from '../components/CarCard';
const services = [{ icon: '🔧', label: 'Mantenimiento' }, { icon: '⚙️', label: 'Reparación' }, { icon: '🛞', label: 'Neumáticos' }, { icon: '🛑', label: 'Frenos' }, { icon: '💻', label: 'Diagnóstico' }, { icon: '❄️', label: 'Aire acondicionado' }, { icon: '📋', label: 'ITV / Revisión' }];
export default function Home() {
  const [featured, setFeatured] = useState([]);
  useEffect(() => { getFeaturedCars().then(setFeatured).catch(() => { }); }, []);
  return (
    <>
      <Helmet><title>Talleres Mecánicos M.O. — Maliaño, Cantabria</title><meta name="description" content="Taller mecánico en Maliaño. Reparación, mantenimiento y exportación. C. Alday 36." /></Helmet>
      <section style={{ minHeight: '88vh', background: 'var(--bg-nav)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="/hero-bg.png" alt="Workshop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} className="animate-fadeIn" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--bg-surface) 30%, transparent 80%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface), transparent 40%)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 720 }}>
            <div className="section-label animate-fadeInUp" style={{ color: 'var(--red)', fontWeight: 800, textShadow: '0 0 20px rgba(214,40,40,0.4)' }}>Tu taller en Maliaño</div>
            <h1 className="animate-fadeInUp delay-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(3rem,7vw,6.2rem)', textTransform: 'uppercase', letterSpacing: 2, lineHeight: 0.92, marginBottom: 15, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              TALLERES<br /><span style={{ color: 'var(--red)' }}>MECÁNICOS</span><br />M.O.
            </h1>
            <p className="animate-fadeInUp delay-2" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: '24px 0 42px', maxWidth: 520, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }}>Reparación especializada, mantenimiento preventivo y exportación internacional de vehículos con más de 20 años de trayectoria en Cantabria.</p>
            <div className="animate-fadeInUp delay-3" style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
              <Link to="/taller#cita" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1rem' }}>RESERVAR CITA</Link>
              <Link to="/catalogo" className="btn btn-ghost" style={{ padding: '16px 32px', fontSize: '1rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(5px)' }}>VER CATÁLOGO</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-base)' }}>
        <div className="container">
          <div className="home-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="card card-accent" style={{ padding: '40px 36px' }}>
              <div style={{ fontSize: '3rem', marginBottom: 20 }}>🔧</div>
              <div className="section-label">Servicio</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.2rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Taller<br />Mecánico</div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28, fontSize: '0.95rem' }}>Mantenimiento, reparación, neumáticos, frenos, diagnóstico, aire acondicionado e ITV.</p>
              <Link to="/taller#cita" className="btn btn-primary">Pedir Cita →</Link>
            </div>
            <div className="card" style={{ padding: '40px 36px', background: 'var(--bg-raised)', border: '1px solid var(--border-steel)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 80% 20%,rgba(247,183,49,0.04),transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '3rem', marginBottom: 20 }}>🚢</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: 4, color: 'var(--yellow)', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ display: 'block', width: 28, height: 2, background: 'var(--yellow)' }} />Internacional</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.2rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Exportación<br />de Coches</div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28, fontSize: '0.95rem' }}>Venta y exportación internacional. Catálogo disponible y búsqueda personalizada.</p>
                <Link to="/exportacion" className="btn btn-ghost">Ver exportación →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {featured.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div className="section-label">Catálogo</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
              <div className="section-title">Coches Destacados</div>
              <Link to="/catalogo" className="btn btn-ghost" style={{ flexShrink: 0 }}>Ver todo →</Link>
            </div>
            <div className="cars-grid">{featured.slice(0, 3).map(car => <CarCard key={car._id} car={car} />)}</div>
          </div>
        </section>
      )}
      <section className="section-sm" style={{ background: 'var(--red)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: 2, textTransform: 'uppercase', color: 'white', marginBottom: 8 }}>¿Necesitas ayuda con tu vehículo?</div>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>Llámanos o rellena el formulario online.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:669851778" className="btn" style={{ background: 'white', color: 'var(--red)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>📞 669 85 17 78</a>
            <Link to="/taller#cita" className="btn" style={{ border: '2px solid rgba(255,255,255,0.6)', color: 'white', background: 'transparent', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>Pedir Cita Online</Link>
          </div>
        </div>
      </section>
    </>
  );
}
