// ============================================================
// routes/appointments.js — Formulario de citas del taller
// ============================================================

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const { sendAppointmentEmail } = require('../utils/mailer');

// 🔒 MEJORA SEGURIDAD: Rate limiting
// Máximo 5 citas por IP cada hora — evita spam en el formulario
const appointmentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5,
  message: { error: 'Demasiadas solicitudes. Inténtalo en 1 hora.' }
});

// Validaciones del formulario
const validateAppointment = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('telefono').trim().notEmpty().withMessage('El teléfono es obligatorio'),
  body('email').isEmail().withMessage('Email no válido'),
  body('marca').trim().notEmpty().withMessage('La marca es obligatoria'),
  body('modelo').trim().notEmpty().withMessage('El modelo es obligatorio'),
  body('matricula').trim().notEmpty().withMessage('La matrícula es obligatoria'),
  body('servicio').trim().notEmpty().withMessage('El servicio es obligatorio'),
  body('fechaHora').notEmpty().withMessage('La fecha y hora son obligatorias'),
];

// POST /api/appointments
router.post('/', appointmentLimiter, validateAppointment, async (req, res) => {
  // Comprobar si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await sendAppointmentEmail(req.body);
    res.json({ message: '¡Solicitud enviada! Te contactaremos pronto para confirmar la cita.' });
  } catch (error) {
    console.error('Error enviando email de cita:', error);
    res.status(500).json({ error: 'Error al enviar la solicitud. Llámanos directamente al 669 85 17 78.' });
  }
});

module.exports = router;


// ============================================================
// NOTA: Guarda este archivo en routes/appointments.js
// y crea routes/orders.js con el contenido de abajo:
// ============================================================

/*
// routes/orders.js — Formulario de pedido bajo demanda
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { sendOrderEmail } = require('../utils/mailer');

const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Demasiadas solicitudes. Inténtalo en 1 hora.' }
});

router.post('/', orderLimiter, async (req, res) => {
  try {
    await sendOrderEmail(req.body);
    res.json({ message: '¡Pedido recibido! Nos pondremos en contacto contigo pronto.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar el pedido.' });
  }
});

module.exports = router;
*/
