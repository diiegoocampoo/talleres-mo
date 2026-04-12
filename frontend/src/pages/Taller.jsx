import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { sendAppointment } from '../services/api';
import ServiceCard from '../components/ServiceCard';
const services = [
  {
    icon: '🛢️', title: 'Mantenimiento', image: '/img/mantenimiento.jpg',
    description: 'Cambio de aceite, filtros y revisiones periódicas.'
  },
  {
    icon: '⚙️', title: 'Reparación mecánica', image: '/img/reparacion.jpg',
    description: 'Diagnóstico y reparación de cualquier avería.'
  },
  {
    icon: '🛞', title: 'Neumáticos', image: '/img/neumaticos.jpg',
    description: 'Montaje, equilibrado y alineación. Todas las marcas.'
  },
  {
    icon: '🛑', title: 'Frenos', image: '/img/frenos.jpg',
    description: 'Revisión y cambio de pastillas, discos y líquido.'
  },
  {
    icon: '💻', title: 'Diagnóstico electrónico', image: '/img/diagnostico.jpg',
    description: 'Lectura de códigos y diagnóstico completo.'
  },
  {
    icon: '❄️', title: 'Aire acondicionado', image: '/img/aire.jpg',
    description: 'Recarga de gas y mantenimiento del sistema.'
  },
  {
    icon: '📋', title: 'ITV / Revisión', image: '/img/itv.jpg',
    description: 'Revisión previa para pasar la ITV sin problemas.'
  },
  {
    icon: '📋', title: 'Otros servicios', image: '/img/otros.jpg',
    description: 'Servicios a peticion del cliente.'
  },
];
const schema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres'),
  telefono: z.string().min(9, 'Teléfono no válido'),
  email: z.string().email('Email no válido'),
  marca: z.string().min(1, 'Obligatorio'),
  modelo: z.string().min(1, 'Obligatorio'),
  año: z.string().min(4, 'Obligatorio'),
  matricula: z.string().min(6, 'Matrícula no válida'),
  servicio: z.string().min(1, 'Selecciona un servicio'),
  descripcion: z.string().optional(),
  fechaHora: z.string().min(1, 'Selecciona fecha y hora'),
});
export default function Taller() {
  const { hash } = useLocation();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (hash === '#cita') {
      const el = document.getElementById('cita');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [hash]);

  const onSubmit = async (data) => { try { await sendAppointment(data); toast.success('¡Solicitud enviada!'); reset(); } catch (e) { toast.error(e.message || 'Error al enviar'); } };
  return (
    <>
      <Helmet><title>Taller — Talleres Mecánicos M.O.</title></Helmet>
      <section style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '72px 0 60px' }}>
        <div className="container"><div className="section-label animate-fadeInUp">Nuestros servicios</div><h1 className="section-title animate-fadeInUp delay-1">Taller Mecánico</h1><p className="section-desc animate-fadeInUp delay-2">Especialistas en todo tipo de vehículos.</p></div>
      </section>
      <section className="section" style={{ background: 'var(--bg-base)' }}>
        <div className="container">
          <div className="services-grid">
            {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
          </div>
        </div>
      </section>
      <section id="cita" className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="section-label">Reserva online</div>
          <h2 className="section-title" style={{ marginBottom: 8 }}>Pedir Cita</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 40 }}>Rellena el formulario y te confirmamos la cita en menos de 24h.</p>
          <form onSubmit={handleSubmit(onSubmit)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '36px 40px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: 4, color: 'var(--red)', textTransform: 'uppercase', marginBottom: 20 }}>— Datos del cliente</div>
            <div className="form-grid-2">
              <div className="form-group"><label className="form-label">Nombre *</label><input className={`form-input${errors.nombre ? ' error' : ''}`} placeholder="Tu nombre" {...register('nombre')} />{errors.nombre && <span className="form-error">{errors.nombre.message}</span>}</div>
              <div className="form-group"><label className="form-label">Teléfono *</label><input className={`form-input${errors.telefono ? ' error' : ''}`} placeholder="666 000 000" {...register('telefono')} />{errors.telefono && <span className="form-error">{errors.telefono.message}</span>}</div>
            </div>
            <div className="form-group"><label className="form-label">Email *</label><input type="email" className={`form-input${errors.email ? ' error' : ''}`} placeholder="correo@ejemplo.com" {...register('email')} />{errors.email && <span className="form-error">{errors.email.message}</span>}</div>
            <div className="divider" style={{ margin: '28px 0' }}>Datos del vehículo</div>
            <div className="form-grid-2">
              <div className="form-group"><label className="form-label">Marca *</label><input className={`form-input${errors.marca ? ' error' : ''}`} placeholder="Ford, Seat..." {...register('marca')} />{errors.marca && <span className="form-error">{errors.marca.message}</span>}</div>
              <div className="form-group"><label className="form-label">Modelo *</label><input className={`form-input${errors.modelo ? ' error' : ''}`} placeholder="Focus, Ibiza..." {...register('modelo')} />{errors.modelo && <span className="form-error">{errors.modelo.message}</span>}</div>
              <div className="form-group"><label className="form-label">Año *</label><input className={`form-input${errors.año ? ' error' : ''}`} placeholder="2018" type="number" {...register('año')} />{errors.año && <span className="form-error">{errors.año.message}</span>}</div>
              <div className="form-group"><label className="form-label">Matrícula *</label><input className={`form-input${errors.matricula ? ' error' : ''}`} placeholder="1234 ABC" {...register('matricula')} />{errors.matricula && <span className="form-error">{errors.matricula.message}</span>}</div>
            </div>
            <div className="divider" style={{ margin: '28px 0' }}>Servicio y fecha</div>
            <div className="form-group"><label className="form-label">Tipo de servicio *</label><select className={`form-select${errors.servicio ? ' error' : ''}`} {...register('servicio')}><option value="">— Selecciona —</option>{services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}<option value="Otro">Otro</option></select>{errors.servicio && <span className="form-error">{errors.servicio.message}</span>}</div>
            <div className="form-group"><label className="form-label">Descripción del problema</label><textarea className="form-textarea" rows={3} placeholder="Describe el problema..." {...register('descripcion')} /></div>
            <div className="form-group"><label className="form-label">Fecha y hora deseada *</label><input type="datetime-local" className={`form-input${errors.fechaHora ? ' error' : ''}`} {...register('fechaHora')} />{errors.fechaHora && <span className="form-error">{errors.fechaHora.message}</span>}</div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', justifyContent: 'center', marginTop: 8, fontSize: '1.05rem', padding: 15 }}>{isSubmitting ? 'Enviando...' : '✓ Solicitar Cita'}</button>
          </form>
        </div>
      </section>
    </>
  );
}
