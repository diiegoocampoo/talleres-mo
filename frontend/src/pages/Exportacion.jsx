import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendOrder } from '../services/api';
const PAISES = ['España', 'Portugal', 'Francia', 'Alemania', 'Italia', 'Marruecos', 'Senegal', 'Guinea', 'Costa de Marfil', 'Nigeria', 'Angola', 'Sudáfrica', 'Otro'];
export default function Exportacion() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const onSubmit = async (data) => { try { await sendOrder(data); toast.success('¡Pedido enviado!'); reset(); } catch (e) { toast.error(e.message || 'Error al enviar'); } };
  return (
    <>
      <Helmet><title>Exportación — Talleres Mecánicos M.O.</title></Helmet>
      <section style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '72px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 50% 80% at 80% 50%,rgba(247,183,49,0.05),transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ display: 'block', width: 28, height: 2, background: 'var(--yellow)' }} /><span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: 4, color: 'var(--yellow)', textTransform: 'uppercase' }}>Internacional</span></div>
          <h1 className="section-title animate-fadeInUp">Exportación<br />de Vehículos</h1>
          <p className="section-desc animate-fadeInUp delay-1">Venta y exportación internacional desde Cantabria.</p>
          <div className="animate-fadeInUp delay-2" style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <Link to="/catalogo" className="btn btn-primary">📦 Ver Catálogo</Link>
            <a href="#pedido" className="btn btn-ghost">🚗 Solicitar bajo pedido</a>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--bg-base)' }}>
        <div className="container">
          <div className="section-label">Qué ofrecemos</div>
          <h2 className="section-title" style={{ marginBottom: 40 }}>Nuestros Servicios</h2>
          <div className="services-grid">
            {[
              { icon: '🚗', title: 'Coches para exportar', image: '/img/coches.jpg', desc: 'Vehículos preparados y documentados para exportación inmediata.' },
              { icon: '🔍', title: 'Búsqueda personalizada', image: '/img/evaluacion.jpg', desc: 'Dinos qué quieres y nosotros lo buscamos por ti.' },
              { icon: '🚢', title: 'Transporte internacional', image: '/img/aexportar.jpg', desc: 'Gestionamos el envío hasta el destino final.' },
              { icon: '📄', title: 'Gestión documentación', image: '/img/asesoria.jpg', desc: 'Trámites de exportación y homologación sin complicaciones.' },
            ].map((s, i) => (
              <div key={s.title} className="card card-accent animate-fadeInUp"
                style={{ animationDelay: `${i * 0.08}s`, padding: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 200, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg,var(--bg-raised),var(--bg-surface))', flexShrink: 0 }}>
                  {s.image ? (
                    <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '3.5rem' }}>{s.icon}</div>
                  )}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top,rgba(26,26,32,0.8),transparent)' }} />
                </div>
                <div style={{ padding: '22px 24px 26px', flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>{s.title}</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="pedido" className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ display: 'block', width: 28, height: 2, background: 'var(--yellow)' }} /><span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: 4, color: 'var(--yellow)', textTransform: 'uppercase' }}>Bajo pedido</span></div>
          <h2 className="section-title" style={{ marginBottom: 8 }}>Solicitar mi Coche</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 40 }}>Cuéntanos qué buscas y lo encontramos por ti.</p>
          <form onSubmit={handleSubmit(onSubmit)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '36px 40px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: 4, color: 'var(--red)', textTransform: 'uppercase', marginBottom: 20 }}>— Datos del cliente</div>
            <div className="form-grid-2">
              <div className="form-group"><label className="form-label">Nombre *</label><input className="form-input" placeholder="Tu nombre" {...register('nombre', { required: true })} /></div>
              <div className="form-group"><label className="form-label">Teléfono *</label><input className="form-input" placeholder="666 000 000" {...register('telefono', { required: true })} /></div>
              <div className="form-group"><label className="form-label">Email *</label><input type="email" className="form-input" placeholder="correo@ejemplo.com" {...register('email', { required: true })} /></div>
              <div className="form-group"><label className="form-label">País de destino *</label><select className="form-select" {...register('paisDestino', { required: true })}><option value="">— Selecciona —</option>{PAISES.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
            </div>
            <div className="divider" style={{ margin: '24px 0' }}>Características del coche</div>
            <div className="form-grid-2">
              <div className="form-group"><label className="form-label">Marca</label><input className="form-input" placeholder="Ford, Toyota..." {...register('marca')} /></div>
              <div className="form-group"><label className="form-label">Modelo</label><input className="form-input" placeholder="Focus, Corolla..." {...register('modelo')} /></div>
              <div className="form-group"><label className="form-label">Año mínimo</label><input type="number" className="form-input" placeholder="2015" {...register('añoMin')} /></div>
              <div className="form-group"><label className="form-label">Presupuesto (€)</label><input type="number" className="form-input" placeholder="15000" {...register('presupuesto')} /></div>
              <div className="form-group"><label className="form-label">Combustible</label><select className="form-select" {...register('combustible')}><option value="">Indiferente</option><option value="gasolina">Gasolina</option><option value="diesel">Diésel</option><option value="hibrido">Híbrido</option><option value="electrico">Eléctrico</option></select></div>
              <div className="form-group"><label className="form-label">Tipo</label><select className="form-select" {...register('tipo')}><option value="">Indiferente</option><option value="pequeño">Pequeño</option><option value="berlina">Berlina</option><option value="suv">SUV</option><option value="furgoneta">Furgoneta</option><option value="deportivo">Deportivo</option></select></div>
              <div className="form-group"><label className="form-label">Cambio</label><select className="form-select" {...register('cambio')}><option value="">Indiferente</option><option value="manual">Manual</option><option value="automatico">Automático</option></select></div>
              <div className="form-group"><label className="form-label">Km máximos</label><input type="number" className="form-input" placeholder="150000" {...register('kmMaximos')} /></div>
            </div>
            <div className="form-group"><label className="form-label">Describe exactamente lo que buscas</label><textarea className="form-textarea" rows={4} placeholder="Todos los detalles..." {...register('descripcion')} /></div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}><input type="checkbox" {...register('urgente')} style={{ width: 16, height: 16, accentColor: 'var(--red)' }} /><span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>⚡ Es urgente</span></label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}><input type="checkbox" {...register('whatsapp')} style={{ width: 16, height: 16, accentColor: 'var(--red)' }} /><span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>💬 Contactar por WhatsApp</span></label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', justifyContent: 'center', fontSize: '1.05rem', padding: 15 }}>{isSubmitting ? 'Enviando...' : '🚗 Buscar mi Coche'}</button>
          </form>
        </div>
      </section>
    </>
  );
}
