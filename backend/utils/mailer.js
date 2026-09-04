// ============================================================
// utils/mailer.js — Envío de correos con Nodemailer
// ============================================================

const nodemailer = require('nodemailer');

// ============================================================
// TRANSPORTER: La "conexión" al servidor de correo
// Se configura una vez y se reutiliza para todos los correos
// ============================================================
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,  // true para puerto 465, false para 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,  // Contraseña de aplicación, no la normal de Gmail
    },
  });
};

// ============================================================
// ENVIAR CORREO DE CITA DEL TALLER
// Se llama cuando alguien rellena el formulario de cita
// ============================================================
const sendAppointmentEmail = async (data) => {
  const transporter = createTransporter();

  // Correo que recibe el TALLER
  const mailToWorkshop = {
    from: `"Web Talleres M.O." <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Nueva cita solicitada — ${data.nombre} — ${data.servicio}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="background: #1a1a2e; color: #e94560; padding: 20px; margin: 0;">
          Nueva Solicitud de Cita
        </h2>
        <div style="padding: 20px; background: #f9f9f9;">
          <h3>Datos del cliente</h3>
          <p><strong>Nombre:</strong> ${data.nombre}</p>
          <p><strong>Teléfono:</strong> ${data.telefono}</p>
          <p><strong>Correo:</strong> ${data.email}</p>
          
          <h3>Datos del vehículo</h3>
          <p><strong>Marca:</strong> ${data.marca}</p>
          <p><strong>Modelo:</strong> ${data.modelo}</p>
          <p><strong>Año:</strong> ${data.año}</p>
          <p><strong>Matrícula:</strong> ${data.matricula}</p>
          
          <h3>Servicio solicitado</h3>
          <p><strong>Tipo:</strong> ${data.servicio}</p>
          <p><strong>Descripción:</strong> ${data.descripcion || 'No especificada'}</p>
          
          <h3>Fecha deseada</h3>
          <p><strong>Fecha y hora:</strong> ${new Date(data.fechaHora).toLocaleString('es-ES')}</p>
        </div>
        <div style="padding: 10px 20px; background: #eee; font-size: 12px; color: #666;">
          Mensaje enviado desde la web de Talleres M.O.
        </div>
      </div>
    `,
  };

  // 💡 MEJORA: Correo de confirmación que recibe el CLIENTE
  const mailToClient = {
    from: `"Talleres M.O." <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: 'Hemos recibido tu solicitud de cita — Talleres M.O.',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="background: #1a1a2e; color: #e94560; padding: 20px; margin: 0;">
          ¡Solicitud recibida!
        </h2>
        <div style="padding: 20px;">
          <p>Hola <strong>${data.nombre}</strong>,</p>
          <p>Hemos recibido tu solicitud de cita para el servicio de <strong>${data.servicio}</strong>.</p>
          <p>Nos pondremos en contacto contigo lo antes posible para confirmar la cita.</p>
          <p>Fecha deseada: <strong>${new Date(data.fechaHora).toLocaleString('es-ES')}</strong></p>
          <br>
          <p>Talleres Mecánicos M.O.</p>
          <p>📞 669 85 17 78 | 📍 C. Alday, 36, 39600 Maliaño, Cantabria</p>
        </div>
      </div>
    `,
  };

  // Enviamos ambos correos en paralelo (más rápido)
  await Promise.all([
    transporter.sendMail(mailToWorkshop),
    transporter.sendMail(mailToClient),
  ]);
};

// ============================================================
// ENVIAR CORREO DE PEDIDO BAJO DEMANDA (Exportación)
// ============================================================
const sendOrderEmail = async (data) => {
  const transporter = createTransporter();

  const mailToWorkshop = {
    from: `"Web Talleres M.O." <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Nuevo pedido bajo demanda — ${data.nombre} — ${data.marca} ${data.modelo}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="background: #1a1a2e; color: #e94560; padding: 20px; margin: 0;">
          Nuevo Pedido Bajo Demanda
        </h2>
        <div style="padding: 20px; background: #f9f9f9;">
          <h3>Datos del cliente</h3>
          <p><strong>Nombre:</strong> ${data.nombre}</p>
          <p><strong>Teléfono:</strong> ${data.telefono}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>País de destino:</strong> ${data.paisDestino}</p>
          ${data.whatsapp ? '<p>✅ <strong>Quiere contacto por WhatsApp</strong></p>' : ''}
          ${data.urgente ? '<p>⚠️ <strong>ES URGENTE</strong></p>' : ''}
          
          <h3>Características del coche</h3>
          <p><strong>Marca:</strong> ${data.marca || 'No especificada'}</p>
          <p><strong>Modelo:</strong> ${data.modelo || 'No especificado'}</p>
          <p><strong>Año:</strong> ${data.añoMin || '-'} — ${data.añoMax || '-'}</p>
          <p><strong>Presupuesto:</strong> ${data.presupuesto ? data.presupuesto + '€' : 'No especificado'}</p>
          <p><strong>Combustible:</strong> ${data.combustible || 'Indiferente'}</p>
          <p><strong>Tipo:</strong> ${data.tipo || 'Indiferente'}</p>
          <p><strong>Km máximos:</strong> ${data.kmMaximos || 'No especificado'}</p>
          <p><strong>Cambio:</strong> ${data.cambio || 'Indiferente'}</p>
          <p><strong>Color:</strong> ${data.color || 'Indiferente'}</p>
          <p><strong>Extras:</strong> ${data.extras || 'No especificado'}</p>
          
          <h3>Descripción libre</h3>
          <p>${data.descripcion || 'No proporcionada'}</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailToWorkshop);
};

// ============================================================
// ENVIAR CORREO DE INTERÉS EN UN COCHE DEL CATÁLOGO
// ============================================================
const sendCarInterestEmail = async (data) => {
  const transporter = createTransporter();

  const mailToWorkshop = {
    from: `"Web Talleres M.O." <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Interés en coche — ${data.cocheMarca} ${data.cocheModelo} — ${data.nombre}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="background: #1a1a2e; color: #e94560; padding: 20px; margin: 0;">
          Cliente interesado en un coche del catálogo
        </h2>
        <div style="padding: 20px; background: #f9f9f9;">
          <h3>Coche de interés</h3>
          <p><strong>${data.cocheMarca} ${data.cocheModelo} ${data.cocheAño}</strong></p>
          <p><strong>ID del coche:</strong> ${data.cocheId}</p>
          
          <h3>Datos del cliente</h3>
          <p><strong>Nombre:</strong> ${data.nombre}</p>
          <p><strong>Teléfono:</strong> ${data.telefono}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Mensaje:</strong> ${data.mensaje || 'Sin mensaje adicional'}</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailToWorkshop);
};

module.exports = {
  sendAppointmentEmail,
  sendOrderEmail,
  sendCarInterestEmail,
};
