@echo off
echo ========================================
echo   Installing Movie Watchlist Dependencies
echo ========================================
echo.

echo Installing Backend Dependencies...
cd C:\movie-watchlist\backend
call npm install
echo.

echo Installing Frontend Dependencies...
cd C:\movie-watchlist\frontend
call npm install
echo.

echo ========================================
echo   All dependencies installed!
echo   Now run: start-project.bat
echo ========================================
pause
