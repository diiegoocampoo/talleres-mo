@echo off
setlocal
cd /d %~dp0

:: Colores para la consola (Opcional, 0A = Verde, 0F = Blanco)
color 0B

echo.
echo  ======================================================
echo     TALLERES MECANICOS M.O. - MODO DESARROLLO
echo  ======================================================
echo.
echo  1. Iniciando Servidor Backend (API)...
start "Backend - Talleres M.O." cmd /c "cd backend && npm run dev"

echo  2. Iniciando Servidor Frontend (Vite)...
start "Frontend - Talleres M.O." cmd /c "cd frontend && npm run dev"

echo.
echo  ------------------------------------------------------
echo  Backend: http://localhost:5000 (aprox)
echo  Frontend: http://localhost:5173
echo  ------------------------------------------------------
echo.
echo  Presiona cualquier tecla para cerrar este mensaje, 
echo  pero NO cierres las otras ventanas que se han abierto.
echo.
pause > nul
