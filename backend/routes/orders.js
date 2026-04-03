// routes/orders.js — Formulario de pedido bajo demanda (Exportación)

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const { sendOrderEmail, sendCarInterestEmail } = require('../utils/mailer');

// 🔒 Rate limiting: máximo 3 pedidos por IP por hora
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Demasiadas solicitudes. Inténtalo en 1 hora.' }
});

const validateOrder = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('telefono').trim().notEmpty().withMessage('El teléfono es obligatorio'),
  body('email').isEmail().withMessage('Email no válido'),
  body('paisDestino').trim().notEmpty().withMessage('El país de destino es obligatorio'),
];

// POST /api/orders — Pedido bajo demanda
router.post('/', orderLimiter, validateOrder, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await sendOrderEmail(req.body);
    res.json({ message: '¡Pedido recibido! Buscaremos tu coche y te contactaremos pronto.' });
  } catch (error) {
    console.error('Error enviando email de pedido:', error);
    res.status(500).json({ error: 'Error al enviar el pedido. Llámanos al 669 85 17 78.' });
  }
});

// POST /api/orders/interest — Interés en un coche del catálogo
router.post('/interest', orderLimiter, async (req, res) => {
  try {
    await sendCarInterestEmail(req.body);
    res.json({ message: '¡Mensaje enviado! El equipo de Talleres M.O. te contactará pronto.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar el mensaje.' });
  }
});

module.exports = router;
