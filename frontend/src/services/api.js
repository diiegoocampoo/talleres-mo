const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_BASE = BASE.replace('/api', '');
const authFetch = (url, opts={}) => {
  const t = sessionStorage.getItem('adminToken');
  return fetch(`${BASE}${url}`, { ...opts, headers: { ...opts.headers, ...(t?{Authorization:`Bearer ${t}`}:{}) } });
};
export const getCars = async (p={}) => { const q = new URLSearchParams(p).toString(); const r = await fetch(`${BASE}/cars?${q}`); if(!r.ok) throw new Error('Error'); return r.json(); };
export const getCarById = async (id) => { const r = await fetch(`${BASE}/cars/${id}`); if(!r.ok) throw new Error('No encontrado'); return r.json(); };
export const getFeaturedCars = async () => { const r = await fetch(`${BASE}/cars/featured`); if(!r.ok) throw new Error('Error'); return r.json(); };
export const createCar = async (fd) => { const r = await authFetch('/cars',{method:'POST',body:fd}); const d = await r.json(); if(!r.ok) throw new Error(d.error); return d; };
export const updateCar = async (id, fd) => { const r = await authFetch(`/cars/${id}`,{method:'PUT',body:fd}); const d = await r.json(); if(!r.ok) throw new Error(d.error); return d; };
export const deleteCar = async (id) => { const r = await authFetch(`/cars/${id}`,{method:'DELETE'}); const d = await r.json(); if(!r.ok) throw new Error(d.error); return d; };
export const sendAppointment = async (data) => { const r = await fetch(`${BASE}/appointments`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); const d = await r.json(); if(!r.ok) throw new Error(d.error); return d; };
export const sendOrder = async (data) => { const r = await fetch(`${BASE}/orders`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); const d = await r.json(); if(!r.ok) throw new Error(d.error); return d; };
export const sendCarInterest = async (data) => { const r = await fetch(`${BASE}/orders/interest`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); const d = await r.json(); if(!r.ok) throw new Error(d.error); return d; };
export const loginAdmin = async (u,p) => { const r = await fetch(`${BASE}/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:u,password:p})}); const d = await r.json(); if(!r.ok) throw new Error(d.error); return d; };
export const updateAdmin = async (data) => { const r = await authFetch('/auth/update',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); const d = await r.json(); if(!r.ok) throw new Error(d.error); return d; };
