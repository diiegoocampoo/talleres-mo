# Talleres Mecánicos M.O. — Guía de instalación

## PASO 1 — Instalar Node.js
Ve a https://nodejs.org y descarga la versión LTS. Instala normalmente.

## PASO 2 — Instalar dependencias del backend
```
cd backend
npm install
```

## PASO 3 — Configurar el backend
Copia `.env.example` y renómbralo a `.env`. Rellena los datos:
- MONGODB_URI → tu connection string de MongoDB Atlas
- JWT_SECRET → escribe cualquier texto largo aleatorio
- EMAIL_USER / EMAIL_PASS → tu correo Gmail + contraseña de aplicación
- EMAIL_TO → correo donde quieres recibir las citas y pedidos

## PASO 4 — Instalar dependencias del frontend
```
cd frontend
npm install
```

## PASO 5 — Configurar el frontend
Copia `.env.example` y renómbralo a `.env`. No hace falta cambiar nada si vas a probar en local.

## PASO 6 — Arrancar el proyecto (necesitas 2 terminales)
Terminal 1:  cd backend  →  npm run dev
Terminal 2:  cd frontend →  npm run dev

Abre http://localhost:5173 en el navegador.

## PASO 7 — Crear el usuario admin (solo la primera vez)
Haz una petición POST a: http://localhost:5000/api/auth/setup
Con el body JSON:
{
  "username": "admin",
  "password": "tu_contraseña",
  "email": "tu@correo.com"
}
Puedes usar Postman, Thunder Client (extensión VS Code) o cualquier herramienta similar.

## Estructura de archivos
- frontend/src/pages/ → las 7 páginas de la web
- frontend/src/components/ → Navbar, Footer, CarCard, ServiceCard...
- frontend/src/context/ → ThemeContext (modo oscuro), AuthContext (login admin)
- backend/routes/ → endpoints de la API
- backend/models/ → esquemas de la base de datos
- backend/utils/mailer.js → lógica de envío de correos
