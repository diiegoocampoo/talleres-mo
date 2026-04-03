// ============================================================
// server.js — Punto de entrada del backend
// Este archivo arranca el servidor y conecta todo
// ============================================================

const express = require('express');        // Framework web
const mongoose = require('mongoose');      // Conexión a MongoDB
const cors = require('cors');              // Permite que el frontend hable con el backend
const helmet = require('helmet');          // Cabeceras de seguridad HTTP
const path = require('path');             // Para manejar rutas de archivos
require('dotenv').config();               // Carga las variables del archivo .env

const app = express();

// ============================================================
// MIDDLEWARES GLOBALES
// Un middleware es código que se ejecuta en CADA petición
// ============================================================

app.use(helmet());                         // 🔒 Seguridad: añade cabeceras HTTP protectoras
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Parsea JSON. Limit 10mb para fotos en base64
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================
// CARPETA DE IMÁGENES ESTÁTICA
// Las fotos subidas al catálogo se guardan aquí
// Al ser "static", el frontend puede acceder a ellas directamente
// Ejemplo: http://localhost:5000/uploads/foto-coche.jpg
// ============================================================
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================================
// RUTAS DE LA API
// Cada archivo de rutas maneja una parte de la aplicación
// ============================================================
app.use('/api/auth',         require('./routes/auth'));          // Login admin
app.use('/api/cars',         require('./routes/cars'));          // Catálogo de coches
app.use('/api/appointments', require('./routes/appointments')); // Citas del taller
app.use('/api/orders',       require('./routes/orders'));        // Pedidos de exportación

// ============================================================
// RUTA DE PRUEBA — para verificar que el servidor funciona
// Accede a http://localhost:5000/api/health en el navegador
// ============================================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor de Talleres M.O. funcionando ✓' });
});

// ============================================================
// MANEJO DE ERRORES GLOBAL
// Si algo falla en cualquier ruta, llega aquí
// ============================================================
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

// ============================================================
// CONEXIÓN A MONGODB Y ARRANQUE DEL SERVIDOR
// ============================================================
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/talleres-mo';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1); // Para el proceso si no puede conectar a la BD
  });
