import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { getCarById, API_BASE, sendCarInterest } from '../services/api';

const fuel = { gasolina: 'Gasolina', diesel: 'Diésel', hibrido: 'Híbrido', electrico: 'Eléctrico' };

export default function CarDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', mensaje: '' });
  const [sending, setSending] = useState(false);

  const formatNum = (val) => {
    if (val === null || val === undefined) return '0';
    const num = Number(val);
    return isNaN(num) ? val.toString() : num.toLocaleString('es-ES');
  };

  const getImgUrl = (path) => {
    if (!path || typeof path !== 'string') return '';
    return path.startsWith('http') ? path : `${API_BASE}${path}`;
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getCarById(id)
      .then(res => {
        if (mounted) {
          setCar(res);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Error cargando coche:", err);
        if (mounted) {
          toast.error('No se pudo encontrar el coche');
          setLoading(false);
        }
      });

    return () => { mounted = false; };
  }, [id]);

  const send = async (e) => {
    e.preventDefault();
    if (!car) return;
    setSending(true);
    try {
      await sendCarInterest({
        ...form,
        cocheId: car._id,
        cocheMarca: car.marca,
        cocheModelo: car.modelo,
        cocheAño: car.año,
      });
      toast.success('¡Interés enviado! Te contactaremos pronto.');
      setShowForm(false);
      setForm({ nombre: '', telefono: '', email: '', mensaje: '' });
    } catch (err) {
      toast.error('Error al enviar el mensaje');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--red)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 20 }}></div>
        <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: 2 }}>CARGANDO VEHÍCULO...</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!car) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, background: 'var(--bg-base)' }}>
        <span style={{ fontSize: '5rem' }}>🚫</span>
        <h2 style={{ fontFamily: 'var(--font-display)', letterSpacing: 2 }}>VEHÍCULO NO ENCONTRADO</h2>
        <Link to="/catalogo" className="btn btn-primary">Volver al catálogo</Link>
      </div>
    );
  }

  const fotos = Array.isArray(car.fotos) ? car.fotos : [];
  const extras = Array.isArray(car.extras) ? car.extras : [];
  const combustibleLbl = fuel[car.combustible] || car.combustible || 'Gasolina';

  return (
    <>
      <Helmet><title>{car.marca} {car.modelo} — Talleres M.O.</title></Helmet>

      {/* Navegación Superior */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '15px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: 1 }}>
            <Link to="/" style={{ color: 'var(--text-muted)' }}>Inicio</Link>
            <span>/</span>
            <Link to="/catalogo" style={{ color: 'var(--text-muted)' }}>Catálogo</Link>
            <span>/</span>
            <span style={{ color: 'var(--red)', fontWeight: 800 }}>{car.marca} {car.modelo}</span>
          </div>
          <button onClick={() => navigate(-1)} className="btn btn-ghost" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>← VOLVER</button>
        </div>
      </div>

      <div className="container section-sm" style={{ paddingBottom: 80 }}>
        <div className="detail-grid">

          {/* Galería */}
          <div className="gallery-section">
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              {fotos[idx] ? (
                <img key={fotos[idx]} src={getImgUrl(fotos[idx])} alt={car.modelo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ textAlign: 'center', opacity: 0.3 }}>
                  <div style={{ fontSize: '6rem' }}>🚗</div>
                  <div style={{ fontFamily: 'var(--font-display)', letterSpacing: 2 }}>SIN IMÁGENES</div>
                </div>
              )}
            </div>

            {fotos.length > 1 && (
              <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 10, marginBottom: 30 }}>
                {fotos.map((f, i) => (
                  <div key={i} onClick={() => setIdx(i)} style={{ flexShrink: 0, width: 100, height: 65, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${i === idx ? 'var(--red)' : 'transparent'}`, opacity: i === idx ? 1 : 0.5, transition: '0.2s' }}>
                    <img src={getImgUrl(f)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información Principal y Especificaciones */}
          <div className="specs-section" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Título y Precio */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 35 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
                <span className={`badge badge-${car.combustible || 'gasolina'}`}>{combustibleLbl}</span>
                <span className="badge badge-diesel">{car.cambio === 'automatico' ? 'Automático' : 'Manual'}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.5rem', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 10 }}>{car.marca}<br />{car.modelo}</h1>
              <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: 25, fontFamily: 'var(--font-display)' }}>Año {car.año} · {formatNum(car.kilometros)} km</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--red)', fontFamily: 'var(--font-display)', borderTop: '1px solid var(--border)', paddingTop: 20 }}>{formatNum(car.precio)} €</div>
            </div>

            {/* DESCRIPCIÓN (Ahora aquí encima de equipamiento) */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 35 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--red)', marginBottom: 15, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>Descripción</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontSize: '1.02rem', margin: 0 }}>{car.descripcion || 'No hay descripción disponible para este vehículo.'}</p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 30 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: 2, color: 'var(--steel)', marginBottom: 20, textTransform: 'uppercase' }}>Equipamiento Destacado</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {extras.length > 0 ? extras.map(ex => <span key={ex} className="badge badge-diesel" style={{ fontSize: '0.7rem' }}>{ex}</span>) : <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Equipamiento de serie</span>}
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 30 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: 2, color: 'var(--steel)', marginBottom: 20, textTransform: 'uppercase' }}>Ficha técnica</div>
              {[
                ['🏗', 'Carrocería', car.tipo || 'Berlina'],
                ['⚡', 'Potencia', car.potencia ? `${car.potencia} CV` : 'N/D'],
                ['🎨', 'Color', car.color || 'N/D'],
                ['🚪', 'Puertas', car.puertas || 'N/D']
              ].map(([icon, label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{icon} {label}</span>
                  <span style={{ fontWeight: 700 }}>{value}</span>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ width: '100%', padding: 20, fontSize: '1.1rem', justifyContent: 'center' }}>
              {showForm ? '✕ CERRAR FORMULARIO' : '✉ SOLICITAR INFORMACIÓN'}
            </button>

            {showForm && (
              <form onSubmit={send} style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 30, animation: 'fadeIn 0.3s' }}>
                <input className="form-input" placeholder="Tu nombre" style={{ marginBottom: 15 }} value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
                <input className="form-input" placeholder="Teléfono" style={{ marginBottom: 15 }} value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} required />
                <textarea className="form-textarea" placeholder="¿En qué podemos ayudarte?" style={{ marginBottom: 15 }} value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })} />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={sending}>{sending ? 'ENVIANDO...' : 'ENVIAR CONSULTA'}</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .detail-grid { 
          display: grid; 
          grid-template-columns: 1fr 400px; 
          gap: 40px; 
        }
        @media (max-width: 1024px) { 
          .detail-grid { 
            grid-template-columns: 1fr !important; 
            gap: 20px !important;
          } 
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
