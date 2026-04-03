import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import { API_BASE } from '../services/api';
const fuel = { gasolina:'Gasolina', diesel:'Diésel', hibrido:'Híbrido', electrico:'Eléctrico' };
export default function CarCard({ car }) {
  const formatNum = (val) => {
    if (val === null || val === undefined) return '0';
    const num = Number(val);
    return isNaN(num) ? val.toString() : num.toLocaleString('es-ES');
  };
  const getImgUrl = (path) => {
    if (!path || typeof path !== 'string') return '';
    return path.startsWith('http') ? path : `${API_BASE}${path}`;
  };

  return (
    <Link to={`/catalogo/${car.slug || car._id}`} style={{ display: 'block' }}>
      <div className="card" style={{ cursor: 'pointer' }}>
        <div style={{ height: 190, background: 'var(--bg-raised)', overflow: 'hidden', position: 'relative' }}>
          {car.fotos?.[0] ? <LazyImage src={getImgUrl(car.fotos[0])} alt={`${car.marca} ${car.modelo}`} style={{ width: '100%', height: '100%' }} /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '3rem', color: 'var(--text-muted)' }}>🚗</div>}
          <div style={{ position: 'absolute', top: 10, right: 10 }}><span className={`badge ${car.disponible ? 'badge-hibrido' : 'badge-gasolina'}`}>{car.disponible ? 'Disponible' : 'Vendido'}</span></div>
          {car.destacado && <div style={{ position: 'absolute', top: 10, left: 10 }}><span className="badge badge-gasolina">★ Destacado</span></div>}
        </div>
        <div style={{ padding: '16px 18px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: 1, textTransform: 'uppercase' }}>{car.marca} {car.modelo}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: 1 }}>{car.año}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', color: 'var(--red)' }}>{formatNum(car.precio)}€</div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            <span className={`badge badge-${car.combustible}`}>{fuel[car.combustible] || car.combustible}</span>
            <span className="badge badge-diesel">{car.cambio === 'automatico' ? 'Auto' : 'Manual'}</span>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <span>🛣 {formatNum(car.kilometros)} km</span>
            {car.potencia && <span>⚡ {car.potencia} CV</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
