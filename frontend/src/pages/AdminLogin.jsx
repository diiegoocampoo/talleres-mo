import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { loginAdmin } from '../services/api';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => { e.preventDefault(); setLoading(true); try { const d = await loginAdmin(username, password); login(d.token, d.admin); navigate('/admin/panel'); } catch(err){ toast.error(err.message||'Credenciales incorrectas'); } finally{ setLoading(false); } };
  return (
    <>
      <Helmet><title>Admin — Talleres M.O.</title></Helmet>
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-base)', padding:24 }}>
        <div style={{ width:'100%', maxWidth:380 }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <div style={{ width:56, height:56, background:'var(--red)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', margin:'0 auto 16px' }}>⚙</div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.5rem', letterSpacing:3, textTransform:'uppercase' }}>Panel Admin</div>
            <div style={{ color:'var(--text-muted)', fontSize:'0.85rem', marginTop:4 }}>Talleres Mecánicos M.O.</div>
          </div>
          <form onSubmit={submit} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'32px 28px' }}>
            <div className="form-group"><label className="form-label">Usuario</label><input className="form-input" value={username} onChange={e=>setUsername(e.target.value)} placeholder="admin" required /></div>
            <div className="form-group"><label className="form-label">Contraseña</label><input type="password" className="form-input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required /></div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width:'100%', justifyContent:'center', marginTop:8, fontSize:'1rem', padding:14 }}>{loading?'Accediendo...':'Entrar →'}</button>
          </form>
          <div style={{ textAlign:'center', marginTop:20 }}><Link to="/" style={{ color:'var(--text-muted)', fontSize:'0.82rem', fontFamily:'var(--font-display)', letterSpacing:2, textTransform:'uppercase' }}>← Volver a la web</Link></div>
        </div>
      </div>
    </>
  );
}
