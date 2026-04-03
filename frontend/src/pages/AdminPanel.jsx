import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { getCars, createCar, updateCar, deleteCar, API_BASE, updateAdmin } from '../services/api';
import { useAuth } from '../context/AuthContext';
export default function AdminPanel() {
  const { admin, logout } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [adminForm, setAdminForm] = useState({ username: admin?.username || '', password: '' });
  
  const submitAdmin = async (e) => {
    e.preventDefault();
    if (!confirm('¿Seguro que quieres cambiar tus credenciales? Tendrás que volver a iniciar sesión.')) return;
    try {
      await updateAdmin(adminForm);
      toast.success('Credenciales actualizadas');
      logout();
    } catch(e) { toast.error(e.message); }
  };

  const empty = { marca:'', modelo:'', año:'', kilometros:'', precio:'', combustible:'gasolina', cambio:'manual', tipo:'berlina', color:'', potencia:'', descripcion:'', extras:'', disponible:true, destacado:false };
  const [form, setForm] = useState(empty);
  const [files, setFiles] = useState([]);
  useEffect(() => { load(); }, []);
  const load = async () => { setLoading(true); try { const d = await getCars({limit:50}); setCars(d.cars); } catch(e){ toast.error('Error cargando'); } finally{ setLoading(false); } };
  const handleFiles = (e) => { const f=Array.from(e.target.files); setFiles(f); setPreviews(f.map(f=>URL.createObjectURL(f))); };
  
  const edit = (car) => { 
    setEditingId(car._id); 
    setForm({ ...car, extras: Array.isArray(car.extras) ? car.extras.join(', ') : car.extras }); 
    setPreviews(car.fotos || []);
    setShowForm(true); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (e) => { 
    e.preventDefault(); 
    setSubmitting(true); 
    try { 
      const fd=new FormData(); 
      Object.entries(form).forEach(([k,v])=>{ 
        if (k === 'fotos') return; // No enviamos el array de fotos original como string
        const key = k === 'año' ? 'anio' : k; 
        fd.append(key,v); 
      }); 
      
      if (editingId) {
        // Para editar, enviamos las fotos que YA existen para mantenerlas
        fd.append('fotosExistentes', JSON.stringify(form.fotos || []));
      }

      files.forEach(f=>fd.append('fotos',f)); 
      
      if (editingId) {
        await updateCar(editingId, fd);
        toast.success('Coche actualizado');
      } else {
        await createCar(fd); 
        toast.success('Coche añadido'); 
      }
      
      cancel();
      load(); 
    } catch(e){ toast.error(e.message); } finally{ setSubmitting(false); } 
  };

  const cancel = () => {
    setForm(empty); 
    setFiles([]); 
    setPreviews([]); 
    setShowForm(false); 
    setEditingId(null);
  };

  const remove = async (id, name) => { if(!confirm(`¿Eliminar "${name}"?`)) return; try { await deleteCar(id); toast.success('Eliminado'); load(); } catch(e){ toast.error(e.message); } };
  const inp = k => ({ value:form[k] || '', onChange:e=>setForm({...form,[k]:e.target.value}) });
  const formatNum = (val) => {
    if (val === null || val === undefined) return '0';
    const num = Number(val);
    return isNaN(num) ? val.toString() : num.toLocaleString('es-ES');
  };
  const getImgUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `${API_BASE}${path}`;
  };

  return (
    <>
      <Helmet><title>Panel Admin — Talleres M.O.</title></Helmet>
      <div style={{ minHeight:'100vh', background:'var(--bg-base)', padding:'32px 0' }}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
            <div><div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'2rem', letterSpacing:3, textTransform: 'uppercase' }}>Panel Admin</div><div style={{ color:'var(--text-muted)', fontSize:'0.85rem' }}>Bienvenido, {admin?.username}</div></div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setShowSettings(!showSettings)} className="btn btn-ghost" style={{ fontSize:'0.85rem' }}>⚙ Ajustes</button>
              <button onClick={editingId ? cancel : () => setShowForm(!showForm)} className="btn btn-primary">{showForm ? '✕ Cancelar' : '+ Añadir coche'}</button>
              <button onClick={logout} className="btn btn-ghost" style={{ fontSize:'0.85rem' }}>Salir</button>
            </div>
          </div>

          {showSettings && (
            <form onSubmit={submitAdmin} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'32px 36px', marginBottom:32, borderLeft: '4px solid var(--red)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.1rem', letterSpacing:2, textTransform:'uppercase', marginBottom:24, color:'var(--red)' }}>🔑 Ajustes de cuenta</div>
              <div className="form-grid-2">
                <div className="form-group"><label className="form-label">Nuevo Usuario</label><input className="form-input" value={adminForm.username} onChange={e=>setAdminForm({...adminForm, username: e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Nueva Contraseña</label><input className="form-input" type="password" placeholder="Mínimo 6 caracteres" value={adminForm.password} onChange={e=>setAdminForm({...adminForm, password: e.target.value})} minLength={6} /></div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 20 }}>Al cambiar tus datos, se cerrará la sesión automáticamente por seguridad.</p>
              <button type="submit" className="btn btn-primary" style={{ background: 'var(--text-secondary)', border: 'none' }}>Actualizar credenciales</button>
            </form>
          )}

          {showForm && (
            <form onSubmit={submit} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'32px 36px', marginBottom:32 }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.1rem', letterSpacing:2, textTransform:'uppercase', marginBottom:24, color:'var(--red)' }}>
                {editingId ? 'Editar Coche' : 'Nuevo coche'}
              </div>
              <div className="form-grid-2">
                {[['marca','Marca *','Ford'],['modelo','Modelo *','Focus'],['año','Año *','2020'],['kilometros','Kilómetros *','50000'],['precio','Precio (€) *','12000'],['potencia','Potencia (CV)','120'],['color','Color','Negro']].map(([k,l,ph])=>(
                  <div key={k} className="form-group"><label className="form-label">{l}</label><input className="form-input" placeholder={ph} {...inp(k)} required={l.includes('*')} /></div>
                ))}
                <div className="form-group"><label className="form-label">Combustible</label><select className="form-select" {...inp('combustible')}><option value="gasolina">Gasolina</option><option value="diesel">Diésel</option><option value="hibrido">Híbrido</option><option value="electrico">Eléctrico</option></select></div>
                <div className="form-group"><label className="form-label">Cambio</label><select className="form-select" {...inp('cambio')}><option value="manual">Manual</option><option value="automatico">Automático</option></select></div>
                <div className="form-group"><label className="form-label">Tipo</label><select className="form-select" {...inp('tipo')}><option value="pequeño">Pequeño</option><option value="berlina">Berlina</option><option value="suv">SUV</option><option value="furgoneta">Furgoneta</option><option value="deportivo">Deportivo</option></select></div>
              </div>
              <div className="form-group"><label className="form-label">Descripción</label><textarea className="form-textarea" rows={3} {...inp('descripcion')} /></div>
              <div className="form-group"><label className="form-label">Extras (separados por coma)</label><input className="form-input" placeholder="GPS, Cuero, Techo solar" {...inp('extras')} /></div>
              <div style={{ display:'flex', gap:24, marginBottom:20 }}>
                <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}><input type="checkbox" checked={form.disponible} onChange={e=>setForm({...form,disponible:e.target.checked})} style={{ accentColor:'var(--red)', width:16, height:16 }} /><span style={{ fontFamily:'var(--font-display)', letterSpacing:1, textTransform:'uppercase', fontSize:'0.82rem' }}>Disponible</span></label>
                <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}><input type="checkbox" checked={form.destacado} onChange={e=>setForm({...form,destacado:e.target.checked})} style={{ accentColor:'var(--yellow)', width:16, height:16 }} /><span style={{ fontFamily:'var(--font-display)', letterSpacing:1, textTransform:'uppercase', fontSize:'0.82rem', color:'var(--yellow)' }}>★ Destacado</span></label>
              </div>
              <div className="form-group">
                <label className="form-label">Fotos {editingId && '(Sube nuevas para añadir)'}</label>
                <input type="file" multiple accept="image/*" onChange={handleFiles} style={{ padding:10, background:'var(--bg-raised)', border:'1px dashed var(--border-steel)', borderRadius:'var(--radius)', width:'100%', color:'var(--text-secondary)' }} />
                {previews.length>0 && (
                  <div style={{ display:'flex', gap:8, marginTop:10, flexWrap:'wrap' }}>
                    {previews.map((url,i)=>(
                      <div key={i} style={{ width:80, height:60, borderRadius:6, overflow:'hidden', border:'1px solid var(--border)', position: 'relative' }}>
                        <img src={getImgUrl(url)} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                        {editingId && (
                          <button 
                            type="button" 
                            onClick={() => {
                              const updated = form.fotos.filter((_, idx) => idx !== i);
                              setForm({ ...form, fotos: updated });
                              setPreviews(updated);
                            }}
                            style={{ position: 'absolute', top: 0, right: 0, background: 'var(--red)', color: 'white', border: 'none', width: 20, height: 20, fontSize: 10, cursor: 'pointer' }}
                          >✕</button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting?'Guardando...': (editingId ? '✓ Guardar Cambios' : '✓ Guardar coche')}</button>
            </form>
          )}
          <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', overflow:'hidden' }}>
            <div style={{ padding:'20px 24px', borderBottom:'1px solid var(--border)' }}><span style={{ fontFamily:'var(--font-display)', fontWeight:800, letterSpacing:2, textTransform:'uppercase' }}>Catálogo ({cars.length} coches)</span></div>
            {loading ? <div style={{ padding:40, textAlign:'center', color:'var(--text-muted)' }}>Cargando...</div>
            : cars.length===0 ? <div style={{ padding:60, textAlign:'center', color:'var(--text-muted)' }}><div style={{ fontSize:'3rem', marginBottom:12 }}>🚗</div><div style={{ fontFamily:'var(--font-display)', letterSpacing:2 }}>SIN COCHES — Añade el primero</div></div>
            : cars.map((car,i)=>(
              <div key={car._id} style={{ display:'flex', alignItems:'center', gap:16, padding:'16px 24px', borderBottom:i<cars.length-1?'1px solid var(--border)':'none' }}>
                <div style={{ width:70, height:50, borderRadius:6, overflow:'hidden', background:'var(--bg-raised)', flexShrink:0 }}>{car.fotos?.[0]?<img src={getImgUrl(car.fotos[0])} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />:<div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', fontSize:'1.5rem' }}>🚗</div>}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'0.95rem', letterSpacing:1, textTransform:'uppercase' }}>{car.marca} {car.modelo} {car.año}</div>
                  <div style={{ fontSize:'0.82rem', color:'var(--text-muted)' }}>{formatNum(car.kilometros)} km · {formatNum(car.precio)}€</div>
                </div>
                <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                  <span className={`badge ${car.disponible?'badge-hibrido':'badge-gasolina'}`}>{car.disponible?'Disponible':'Vendido'}</span>
                  {car.destacado&&<span className="badge badge-gasolina">★</span>}
                  <button onClick={() => edit(car)} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid var(--border-steel)', color:'white', borderRadius:4, padding:'5px 10px', fontSize:'0.78rem', fontFamily:'var(--font-display)', letterSpacing:1, textTransform:'uppercase' }}>Editar</button>
                  <button onClick={()=>remove(car._id,`${car.marca} ${car.modelo}`)} style={{ background:'rgba(214,40,40,0.1)', border:'1px solid rgba(214,40,40,0.3)', color:'var(--red)', borderRadius:4, padding:'5px 10px', fontSize:'0.78rem', fontFamily:'var(--font-display)', letterSpacing:1, textTransform:'uppercase' }}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
