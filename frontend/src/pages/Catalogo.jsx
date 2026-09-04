import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import { getCars } from '../services/api';
import CarCard from '../components/CarCard';

const sel = { padding:'9px 12px', background:'var(--bg-raised)', border:'1px solid var(--border-steel)', borderRadius:'var(--radius)', color:'var(--text-primary)', fontFamily:'var(--font-body)', fontSize:'0.87rem', width:'100%', WebkitAppearance:'none' };

export default function Catalogo() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ marca: '', combustible: '', tipo: '', cambio: '', precioMax: '', kmMax: '' });
  
  const timeoutRef = useRef(null);

  const fetch = async (pg = 1, flt = filters) => {
    setLoading(true);
    try {
      const p = { page: pg, limit: 12 };
      Object.entries(flt).forEach(([k, v]) => { if (v) p[k] = v; });
      const d = await getCars(p);
      setCars(d.cars);
      setPagination(d.pagination);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const hf = (k, v) => {
    const n = { ...filters, [k]: v };
    setFilters(n);
    setPage(1);

    // Si es búsqueda de texto (marca), metemos un mini delay para no saturar al servidor
    if (k === 'marca') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => fetch(1, n), 400);
    } else {
      fetch(1, n);
    }
  };

  const clear = () => {
    const e = { marca: '', combustible: '', tipo: '', cambio: '', precioMax: '', kmMax: '' };
    setFilters(e);
    setPage(1);
    fetch(1, e);
  };

  const [showFilters, setShowFilters] = useState(false);
  const hasF = Object.values(filters).some(Boolean);

  return (
    <>
      <Helmet><title>Catálogo — Talleres Mecánicos M.O.</title></Helmet>
      
      <section style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '72px 0 60px' }}>
        <div className="container">
          <div className="section-label">Vehículos disponibles</div>
          <h1 className="section-title">Catálogo</h1>
          <p className="section-desc">Todos nuestros coches disponibles para compra y exportación.</p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-base)', paddingTop: 40 }}>
        <div className="container">
          
          {/* Botón de Filtros para Móvil */}
          <button 
            className="mobile-only btn btn-ghost" 
            onClick={() => setShowFilters(!showFilters)}
            style={{ width: '100%', marginBottom: 20, justifyContent: 'center', display: 'none' }}
          >
            {showFilters ? '✕ Ocultar Filtros' : '🔍 Filtrar Resultados'}
          </button>

          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            
            {/* Panel de Filtros */}
            <div style={{ width: 240, flexShrink: 0 }} className={`filters-panel ${showFilters ? 'show' : ''}`}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 20px', position: 'sticky', top: 90 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: 2, textTransform: 'uppercase' }}>Filtros</span>
                  {hasF && <button onClick={clear} style={{ background: 'none', border: 'none', color: 'var(--red)', fontSize: '0.78rem', fontFamily: 'var(--font-display)', letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer' }}>Limpiar</button>}
                </div>

                <div className="filters-grid-mobile">
                  {/* Filtro Marca con Buscador */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: 2, color: 'var(--steel)', textTransform: 'uppercase', marginBottom: 6 }}>Marca</div>
                    <input type="text" value={filters.marca} onChange={e => hf('marca', e.target.value)} placeholder="Escribe..." style={sel} />
                  </div>

                  {[
                    { label: 'Combustible', k: 'combustible', opts: ['', 'gasolina', 'diesel', 'hibrido', 'electrico'], lbs: ['Todos', 'Gasolina', 'Diésel', 'Híbrido', 'Eléctrico'] },
                    { label: 'Tipo', k: 'tipo', opts: ['', 'pequeño', 'berlina', 'suv', 'furgoneta', 'deportivo'], lbs: ['Todos', 'Pequeño', 'Berlina', 'SUV', 'Furgoneta', 'Deportivo'] },
                    { label: 'Cambio', k: 'cambio', opts: ['', 'manual', 'automatico'], lbs: ['Todos', 'Manual', 'Automático'] }
                  ].map(f => (
                    <div key={f.k} style={{ marginBottom: 14 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: 2, color: 'var(--steel)', textTransform: 'uppercase', marginBottom: 6 }}>{f.label}</div>
                      <select value={filters[f.k]} onChange={e => hf(f.k, e.target.value)} style={sel}>
                        {f.opts.map((o, i) => <option key={o} value={o}>{f.lbs ? f.lbs[i] : (o || 'Todos')}</option>)}
                      </select>
                    </div>
                  ))}

                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: 2, color: 'var(--steel)', textTransform: 'uppercase', marginBottom: 6 }}>Precio máx</div>
                    <input type="number" value={filters.precioMax} onChange={e => hf('precioMax', e.target.value)} placeholder="Sin límite" style={sel} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: 2, color: 'var(--steel)', textTransform: 'uppercase', marginBottom: 6 }}>Km máx</div>
                    <input type="number" value={filters.kmMax} onChange={e => hf('kmMax', e.target.value)} placeholder="Sin límite" style={sel} />
                  </div>
                </div>
              </div>
            </div>

            {/* Galería de Coches */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontFamily: 'var(--font-display)', letterSpacing: 1, textTransform: 'uppercase' }}>
                  {`${pagination.total || 0} vehículos encontrados`}
                </span>
              </div>

              {loading && cars.length === 0 ? (
                <div className="cars-grid">
                  {[...Array(6)].map((_, i) => <div key={i} style={{ height: 320, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', opacity: 0.2 }} />)}
                </div>
              ) : cars.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: 2, textTransform: 'uppercase' }}>Sin resultados</div>
                </div>
              ) : (
                <div className="cars-grid">
                  {cars.map(car => <CarCard key={car._id} car={car} />)}
                </div>
              )}

              {pagination.pages > 1 && (
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 36 }}>
                  {[...Array(pagination.pages)].map((_, i) => (
                    <button key={i} onClick={() => { setPage(i + 1); fetch(i + 1); }} style={{ width: 36, height: 36, borderRadius: 'var(--radius)', border: `1px solid ${page === i + 1 ? 'var(--red)' : 'var(--border-steel)'}`, background: page === i + 1 ? 'var(--red)' : 'var(--bg-raised)', color: page === i + 1 ? 'white' : 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: 700, cursor: 'pointer' }}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media(max-width:768px){
          .mobile-only { display: flex !important; }
          .filters-panel { display: none; width: 100% !important; }
          .filters-panel.show { display: block; }
          .filters-grid-mobile { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        }
      `}</style>
    </>
  );
}
