// ============================================================
// routes/auth.js + controllers/authController.js (combinado)
// Maneja el login del administrador
// ============================================================

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/authMiddleware');

// ============================================================
// POST /api/auth/login
// El admin envía username + password → recibe un JWT token
// ============================================================
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }

    // Buscamos el admin en la base de datos
    const admin = await Admin.findOne({ username: username.toLowerCase() });

    if (!admin) {
      // 💡 SEGURIDAD: Mismo mensaje para usuario incorrecto y contraseña incorrecta
      // Así un atacante no sabe si el usuario existe
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Comparamos la contraseña con el hash guardado
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generamos el JWT token
    // Contiene el ID y username del admin, expira en 7 días
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Login correcto',
      token,
      admin: { username: admin.username, email: admin.email }
    });

  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ============================================================
// GET /api/auth/verify
// El frontend llama a esto al cargar para verificar si el token sigue válido
// ============================================================
router.get('/verify', protect, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// ============================================================
// POST /api/auth/setup
// Crea el usuario admin si no existe aún
// 💡 IMPORTANTE: Llama a esto UNA SOLA VEZ al desplegar la web
// Luego puedes eliminar esta ruta o protegerla
// ============================================================
router.post('/setup', async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) {
      return res.status(400).json({ error: 'El admin ya está configurado' });
    }

    const { username, password, email } = req.body;
    const admin = new Admin({ username, password, email });
    await admin.save();

    res.json({ message: 'Admin creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// PUT /api/auth/update
// El admin ya logueado puede cambiar su propio usuario/pass
// ============================================================
router.put('/update', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ error: 'Perfil no encontrado' });

    const { username, password, email } = req.body;

    if (username) admin.username = username.toLowerCase();
    if (email)    admin.email = email;
    if (password) admin.password = password; // Se encriptará en el pre-save hook del modelo Admin

    await admin.save();
    res.json({ message: 'Credenciales actualizadas correctamente' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
