// ============================================================
// models/Admin.js — Modelo para el usuario administrador
// Solo habrá UN admin: el dueño del taller
// ============================================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Para encriptar contraseñas

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    // La contraseña NUNCA se guarda en texto plano
    // bcrypt la convierte en un hash ilegible: "abc123" → "$2a$10$xK9..."
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// ============================================================
// MIDDLEWARE PRE-SAVE: Encripta la contraseña antes de guardar
// Solo se ejecuta si la contraseña ha cambiado
// ============================================================
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // "salt" es un valor aleatorio que hace el hash único
  // El número 12 indica cuántas veces se procesa (más = más seguro pero más lento)
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ============================================================
// MÉTODO: Compara contraseña introducida con la encriptada
// Uso: const esCorrecta = await admin.comparePassword('micontraseña')
// ============================================================
AdminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);
