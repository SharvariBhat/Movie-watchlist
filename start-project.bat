@echo off
echo ========================================
echo   Movie Watchlist Manager
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d C:\movie-watchlist\backend && npm run dev"
echo.

echo Waiting 3 seconds before starting frontend...
timeout /t 3 /nobreak >nul
echo.

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d C:\movie-watchlist\frontend && npm run dev"
echo.

echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
pause