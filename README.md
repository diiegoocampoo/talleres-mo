# Talleres Mecánicos M.O. — Guía de arranque rápido

## ✅ Lo que tienes hasta ahora

### Archivos del BACKEND (carpeta backend/)
```
backend/
├── server.js                  ← Punto de entrada
├── package.json               ← Dependencias
├── .env                       ← TUS CREDENCIALES (créalo tú)
├── models/
│   ├── Car.js                 ← Modelo de coches en MongoDB
│   └── Admin.js               ← Modelo del admin
├── routes/
│   ├── auth.js                ← Login y verificación JWT
│   ├── cars.js                ← CRUD del catálogo
│   ├── appointments.js        ← Formulario de citas
│   └── orders.js              ← Pedidos bajo demanda
├── middleware/
│   └── authMiddleware.js      ← Protección de rutas admin
└── utils/
    └── mailer.js              ← Envío de correos
```

### Archivos del FRONTEND (carpeta frontend/src/)
```
src/
├── App.jsx                    ← Rutas de la app
├── index.css                  ← Estilos globales + tema oscuro/claro
├── components/
│   ├── Navbar.jsx             ← Barra de navegación
│   ├── Footer.jsx             ← Pie de página
│   ├── CarCard.jsx            ← Tarjeta de coche (lazy loading)
│   └── PrivateRoute.jsx       ← Protege rutas de admin
├── pages/
│   ├── Home.jsx               ← Página de inicio
│   ├── Taller.jsx             ← Servicios + formulario de cita
│   ├── Exportacion.jsx        ← Exportación + formulario bajo pedido
│   ├── Catalogo.jsx           ← Catálogo con filtros
│   ├── CarDetailPage.jsx      ← Detalle de coche + formulario de interés
│   ├── AdminLogin.jsx         ← Login del admin
│   └── AdminPanel.jsx         ← Panel gestión catálogo
├── context/
│   ├── ThemeContext.jsx        ← Tema oscuro/claro
│   └── AuthContext.jsx         ← Estado de sesión admin
└── services/
    ├── api.js                 ← Llamadas al backend
    └── auth.js                ← Login/verificación token
```

---

## 🚀 Cómo arrancar el proyecto

### 1. Crear el archivo .env en backend/
```
PORT=5000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/talleres-mo
JWT_SECRET=pon_aqui_una_cadena_muy_larga_y_aleatoria_12345
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tucorreo@gmail.com
EMAIL_PASS=contraseña_de_aplicacion_gmail
EMAIL_TO=correo_taller@gmail.com
FRONTEND_URL=http://localhost:5173
```

### 2. Instalar dependencias

Terminal 1 (backend):
```bash
cd backend
npm install
npm run dev
```

Terminal 2 (frontend):
```bash
cd frontend
npm install
npm run dev
```

### 3. Crear el admin (solo la primera vez)

Abre Postman o el navegador y haz una petición POST a:
```
POST http://localhost:5000/api/auth/setup
Body (JSON): { "username": "admin", "password": "tucontraseña", "email": "tucorreo@gmail.com" }
```

¡Ya puedes hacer login en http://localhost:5173/admin !

---

## 💡 Mejoras incluidas en el código

- ✅ Modo oscuro/claro (botón en la navbar)
- ✅ Lazy loading de imágenes en el catálogo
- ✅ Filtros avanzados en el catálogo (marca, precio, km, combustible...)
- ✅ Validación en tiempo real en el formulario de cita
- ✅ Confirmación por email al cliente al pedir cita
- ✅ Previsualización de fotos antes de subirlas al panel admin
- ✅ SEO dinámico por coche (meta tags diferentes para cada coche)
- ✅ Rate limiting (máx 5 citas / 3 pedidos por IP por hora)
- ✅ Fotos guardadas en el servidor (sin Cloudinary, sin límites)

---

## ❓ Preguntas frecuentes

**¿Por qué 2 terminales?**
Frontend y backend son dos programas separados en desarrollo. Cuando lo subas a un hosting, el hosting los ejecuta solo y tú solo abres el navegador.

**¿Dónde se guardan las fotos?**
En la carpeta `backend/uploads/cars/`. Al desplegar en un servidor, esa carpeta persiste.

**¿Cómo creo el primer admin?**
Haciendo una petición a /api/auth/setup (ver paso 3). Solo funciona la primera vez.
