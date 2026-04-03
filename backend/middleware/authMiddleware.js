// ============================================================
// middleware/authMiddleware.js
// Protege las rutas del admin verificando el token JWT
// ============================================================

const jwt = require('jsonwebtoken');

// ============================================================
// ¿Qué es un JWT?
// Cuando el admin hace login, el servidor le da un "token" (una cadena larga)
// En cada petición protegida, el frontend envía ese token en la cabecera
// Este middleware verifica que el token sea válido antes de continuar
// ============================================================

const protect = (req, res, next) => {
  // El token viene en la cabecera "Authorization" con formato: "Bearer TOKEN"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado. Token no proporcionado.' });
  }

  // Extraemos solo el token (quitamos "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // Verificamos el token con nuestra clave secreta
    // Si es válido, decoded contiene los datos que guardamos al hacer login
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adjuntamos los datos del admin al objeto request
    // para que las rutas siguientes puedan usarlos
    req.admin = decoded;
    next(); // Continúa hacia la ruta solicitada

  } catch (error) {
    // El token es inválido o ha expirado
    return res.status(401).json({ error: 'Token inválido o expirado. Vuelve a iniciar sesión.' });
  }
};

module.exports = { protect };
