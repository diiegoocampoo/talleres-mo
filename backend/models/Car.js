// ============================================================
// models/Car.js — Modelo de datos para los coches del catálogo
// Define exactamente qué datos tiene cada coche en la base de datos
// ============================================================

const mongoose = require('mongoose');

// Un "Schema" es como una plantilla que define los campos del documento
const CarSchema = new mongoose.Schema(
  {
    // --- DATOS BÁSICOS ---
    marca: {
      type: String,
      required: [true, 'La marca es obligatoria'],
      trim: true,         // Elimina espacios al inicio y final
    },
    modelo: {
      type: String,
      required: [true, 'El modelo es obligatorio'],
      trim: true,
    },
    año: {
      type: Number,
      required: [true, 'El año es obligatorio'],
      min: [1900, 'Año no válido'],
      max: [new Date().getFullYear() + 1, 'Año no válido'],
    },
    kilometros: {
      type: Number,
      required: [true, 'Los kilómetros son obligatorios'],
      min: [0, 'Los kilómetros no pueden ser negativos'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },

    // --- CARACTERÍSTICAS ---
    combustible: {
      type: String,
      enum: ['gasolina', 'diesel', 'hibrido', 'electrico'],  // Solo estos valores permitidos
      required: [true, 'El tipo de combustible es obligatorio'],
    },
    cambio: {
      type: String,
      enum: ['manual', 'automatico'],
      required: [true, 'El tipo de cambio es obligatorio'],
    },
    tipo: {
      type: String,
      // 💡 MEJORA: Añadir más tipos si el negocio crece
      enum: ['pequeño', 'berlina', 'suv', 'furgoneta', 'deportivo', 'otro'],
      required: [true, 'El tipo de vehículo es obligatorio'],
    },
    color: {
      type: String,
      trim: true,
    },
    potencia: {
      type: Number,    // CV / caballos
    },
    puertas: {
      type: Number,
    },

    // --- EXTRAS Y DESCRIPCIÓN ---
    extras: {
      type: [String],  // Array de strings: ['GPS', 'Cuero', 'Techo solar']
      default: [],
    },
    descripcion: {
      type: String,
      trim: true,
    },

    // --- FOTOS ---
    // Array de rutas a las imágenes guardadas en el servidor
    // Ejemplo: ['/uploads/cars/coche-123-1.jpg', '/uploads/cars/coche-123-2.jpg']
    // 💡 MEJORA FUTURA: Si se quiere escalar, migrar a Cloudinary o S3
    fotos: {
      type: [String],
      default: [],
    },

    // --- EXPORTACIÓN ---
    paisesDestino: {
      type: [String],   // A qué países se puede exportar este coche
      default: [],
    },

    // --- ESTADO ---
    disponible: {
      type: Boolean,
      default: true,    // Por defecto, al añadir un coche está disponible
    },
    destacado: {
      type: Boolean,
      default: false,   // 💡 MEJORA: Coches destacados aparecen primero en el catálogo
    },

    // --- SEO ---
    // 💡 MEJORA SEO: Slug para URLs amigables
    // Ejemplo: /catalogo/ford-focus-2019 en vez de /catalogo/64a3f...
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  {
    // "timestamps" añade automáticamente createdAt y updatedAt a cada documento
    timestamps: true,
  }
);

// ============================================================
// MIDDLEWARE PRE-SAVE: Genera el slug automáticamente
// Se ejecuta antes de guardar en la base de datos
// ============================================================
CarSchema.pre('save', function (next) {
  if (this.isModified('marca') || this.isModified('modelo') || this.isModified('año')) {
    // Ejemplo: "Ford Focus 2019" → "ford-focus-2019-abc123"
    const base = `${this.marca}-${this.modelo}-${this.año}`
      .toLowerCase()
      .replace(/\s+/g, '-')       // Espacios → guiones
      .replace(/[^a-z0-9-]/g, ''); // Elimina caracteres especiales

    // Añadimos un trozo del ID para evitar duplicados
    this.slug = `${base}-${this._id.toString().slice(-4)}`;
  }
  next();
});

// ============================================================
// ÍNDICES: Mejoran la velocidad de búsqueda en el catálogo
// 💡 MEJORA RENDIMIENTO: Los índices hacen los filtros mucho más rápidos
// ============================================================
CarSchema.index({ marca: 1, modelo: 1 });
CarSchema.index({ precio: 1 });
CarSchema.index({ disponible: 1 });
CarSchema.index({ slug: 1 });

module.exports = mongoose.model('Car', CarSchema);
