// ============================================================
// routes/cars.js — CRUD completo del catálogo de coches
// Rutas públicas: listar, filtrar, ver detalle
// Rutas protegidas (solo admin): crear, editar, eliminar
// ============================================================

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Car = require('../models/Car');
const { protect } = require('../middleware/authMiddleware');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuración de Multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cars',
    allowed_formats: ['jpg', 'png', 'webp', 'jpeg'],
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto', fetch_format: 'auto' }]
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB máximo
});

// ============================================================
// GET /api/cars — Listar coches con filtros
// Filtros disponibles: marca, combustible, tipo, precioMin,
// precioMax, kmMax, cambio, disponible
// 💡 MEJORA: Filtros avanzados como en coches.net
// ============================================================
router.get('/', async (req, res) => {
  try {
    const {
      marca, combustible, tipo, cambio,
      precioMin, precioMax, kmMax, disponible,
      destacado, page = 1, limit = 12,
      sort = '-createdAt'
    } = req.query;

    // Construimos el filtro dinámicamente
    const filter = {};
    if (marca)       filter.marca = new RegExp(marca, 'i');      // Búsqueda parcial
    if (combustible) filter.combustible = combustible;
    if (tipo)        filter.tipo = tipo;
    if (cambio)      filter.cambio = cambio;
    if (disponible !== undefined) filter.disponible = disponible === 'true';
    if (destacado === 'true') filter.destacado = true;

    // Rango de precio
    if (precioMin || precioMax) {
      filter.precio = {};
      if (precioMin) filter.precio.$gte = parseInt(precioMin);
      if (precioMax) filter.precio.$lte = parseInt(precioMax);
    }

    // Kilómetros máximos
    if (kmMax) filter.kilometros = { $lte: parseInt(kmMax) };

    // Paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Car.countDocuments(filter);

    const cars = await Car.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');  // No devuelve el campo __v (interno de MongoDB)

    res.json({
      cars,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// GET /api/cars/featured — Coches destacados para la portada
// ============================================================
router.get('/featured', async (req, res) => {
  try {
    const cars = await Car.find({ destacado: true, disponible: true })
      .limit(6)
      .sort('-createdAt');
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// GET /api/cars/:id — Detalle de un coche por ID o slug
// ============================================================
router.get('/:id', async (req, res) => {
  try {
    // Intenta buscar por slug primero, luego por ID
    let car = await Car.findOne({ slug: req.params.id });
    if (!car) car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ error: 'Coche no encontrado' });

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// POST /api/cars — Crear coche (SOLO ADMIN)
// Acepta hasta 10 fotos
// ============================================================
router.post('/', protect, upload.array('fotos', 10), async (req, res) => {
  try {
    const carData = { ...req.body };

    // FormData envía 'anio' en vez de 'año' para evitar problemas de encoding con ñ
    if (carData.anio !== undefined) {
      carData['año'] = carData.anio;
      delete carData.anio;
    }

    // FormData envía todo como string — convertir campos numéricos
    if (carData['año'] !== undefined) carData['año'] = Number(carData['año']);
    if (carData.kilometros !== undefined) carData.kilometros = Number(carData.kilometros);
    if (carData.precio !== undefined) carData.precio = Number(carData.precio);
    if (carData.potencia !== undefined && carData.potencia !== '') carData.potencia = Number(carData.potencia);
    if (carData.puertas !== undefined && carData.puertas !== '') carData.puertas = Number(carData.puertas);
    // Convertir booleans (FormData los envía como 'true'/'false')
    if (typeof carData.disponible === 'string') carData.disponible = carData.disponible === 'true';
    if (typeof carData.destacado === 'string') carData.destacado = carData.destacado === 'true';

    // Procesar extras si vienen como string
    if (typeof carData.extras === 'string') {
      carData.extras = carData.extras.split(',').map(e => e.trim()).filter(Boolean);
    }

    // Las fotos subidas ahora vienen directamente de Cloudinary con su URL completa
    if (req.files && req.files.length > 0) {
      carData.fotos = req.files.map(f => f.path);
    }

    const car = new Car(carData);
    await car.save();

    res.status(201).json({ message: 'Coche creado correctamente', car });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================================
// PUT /api/cars/:id — Editar coche (SOLO ADMIN)
// ============================================================
router.put('/:id', protect, upload.array('fotos', 10), async (req, res) => {
  try {
    const carData = { ...req.body };

    // FormData envía 'anio' en vez de 'año' para evitar problemas de encoding con ñ
    if (carData.anio !== undefined) {
      carData['año'] = carData.anio;
      delete carData.anio;
    }

    // FormData envía todo como string — convertir campos numéricos
    if (carData['año'] !== undefined) carData['año'] = Number(carData['año']);
    if (carData.kilometros !== undefined) carData.kilometros = Number(carData.kilometros);
    if (carData.precio !== undefined) carData.precio = Number(carData.precio);
    if (carData.potencia !== undefined && carData.potencia !== '') carData.potencia = Number(carData.potencia);
    if (carData.puertas !== undefined && carData.puertas !== '') carData.puertas = Number(carData.puertas);
    if (typeof carData.disponible === 'string') carData.disponible = carData.disponible === 'true';
    if (typeof carData.destacado === 'string') carData.destacado = carData.destacado === 'true';

    if (typeof carData.extras === 'string') {
      carData.extras = carData.extras.split(',').map(e => e.trim()).filter(Boolean);
    }

    // Si se suben fotos nuevas, añadirlas a las existentes
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(f => f.path);
      const existingPhotos = carData.fotosExistentes
        ? JSON.parse(carData.fotosExistentes)
        : [];
      carData.fotos = [...existingPhotos, ...newPhotos];
    }

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      carData,
      { new: true, runValidators: true } // new: devuelve el doc actualizado
    );

    if (!car) return res.status(404).json({ error: 'Coche no encontrado' });

    res.json({ message: 'Coche actualizado', car });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================================
// DELETE /api/cars/:id — Eliminar coche (SOLO ADMIN)
// ============================================================
router.delete('/:id', protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Coche no encontrado' });

    // Limpiar las fotos
    // 💡 NOTA: Las fotos de Cloudinary se quedan allí por ahora para evitar accidentes.
    // Para eliminarlas de la nube necesitaríamos el public_id, pero al menos ya no intentamos
    // borrarlas del disco duro local, lo que evitara fallos del servidor.
    
    await car.deleteOne();
    res.json({ message: 'Coche eliminado correctamente' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
