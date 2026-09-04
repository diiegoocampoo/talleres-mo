# Talleres Mecánicos M.O.

Web para un taller mecánico con catálogo de coches online, gestión de citas y panel de administración. Hecha con MERN (MongoDB, Express, React, Node.js).

Desarrollada como proyecto real para un cliente.

## Estructura del proyecto

### Backend (`backend/`)

backend/
├── server.js → punto de entrada del servidor
├── package.json
├── .env → credenciales (no subido al repo)
├── models/
│ ├── Car.js → modelo de coches en MongoDB
│ └── Admin.js → modelo del admin
├── routes/
│ ├── auth.js → login y verificación con JWT
│ ├── cars.js → CRUD del catálogo
│ ├── appointments.js → formulario de citas del taller
│ └── orders.js → pedidos bajo demanda
├── middleware/
│ └── authMiddleware.js → protección de rutas de admin
└── utils/
└── mailer.js → envío de correos de confirmación


### Frontend (`frontend/src/`)

src/
├── App.jsx → rutas de la app
├── index.css → estilos globales + tema oscuro/claro
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ ├── CarCard.jsx → tarjeta de coche, con lazy loading
│ └── PrivateRoute.jsx → protege las rutas de admin
├── pages/
│ ├── Home.jsx
│ ├── Taller.jsx → servicios + formulario de cita
│ ├── Exportacion.jsx → formulario de pedido bajo demanda
│ ├── Catalogo.jsx → catálogo con filtros
│ ├── CarDetailPage.jsx → detalle de coche + formulario de interés
│ ├── AdminLogin.jsx
│ └── AdminPanel.jsx → gestión del catálogo
├── context/
│ ├── ThemeContext.jsx
│ └── AuthContext.jsx
└── services/
├── api.js → llamadas al backend
└── auth.js → login y verificación de token


## Cómo levantarlo en local

Necesitas Node.js instalado y una base de datos en MongoDB (uso MongoDB Atlas).

**1. Variables de entorno**

Crea un archivo `.env` dentro de `backend/`:

PORT=5000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/talleres-mo
JWT_SECRET=algo_largo_y_aleatorio
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=mecanicosm.o.25@gmail.com
EMAIL_PASS=contraseña_de_aplicacion_gmail
EMAIL_TO=mecanicosm.o.25@gmail.com
FRONTEND_URL=http://localhost:5173


**2. Instalar y arrancar**

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend (en otra terminal):
```bash
cd frontend
npm install
npm run dev
```

Frontend y backend corren por separado en desarrollo — dos terminales, dos procesos. En producción el hosting se encarga de levantar el backend y tú solo accedes desde el navegador.

**3. Crear el primer admin**

Solo hace falta la primera vez. Con Postman o similar, una petición POST a:

POST http://localhost:5000/api/auth/setup
Body (JSON): { "username": "admin", "password": "tucontraseña", "email": "mecanicosm.o.25@gmail.com" }


Con eso ya puedes entrar en `http://localhost:5173/admin`.

## Qué tiene

- Modo oscuro/claro
- Lazy loading de imágenes en el catálogo
- Filtros en el catálogo (marca, precio, km, combustible...)
- Validación en tiempo real en el formulario de citas
- Email de confirmación automático al pedir cita
- Previsualización de fotos antes de subirlas desde el panel admin
- SEO dinámico por coche (meta tags distintas para cada ficha)
- Rate limiting para evitar spam (máx. 5 citas / 3 pedidos por IP y hora)
- Las fotos se guardan directamente en el servidor, sin depender de servicios externos como Cloudinary

## Notas

Las fotos se guardan en `backend/uploads/cars/`. Al desplegar hay que asegurarse de que esa carpeta persista entre despliegues.
