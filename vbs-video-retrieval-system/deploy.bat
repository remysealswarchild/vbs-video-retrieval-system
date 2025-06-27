@echo off
setlocal enabledelayedexpansion

REM === Video Retrieval System - Local Deployment Script ===

REM --- Start Database (Postgres with pgvector) ---
echo [INFO] Starting Postgres database with Docker Compose...
docker-compose up -d postgres
if errorlevel 1 (
    echo [ERROR] Failed to start Postgres with Docker Compose. Make sure Docker is running.
    exit /b 1
)

REM --- Backend (Flask Query Server) Setup ---
echo [INFO] Setting up Python backend (query_server)...
cd query_server

if not exist venv (
    echo [INFO] Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate

if exist requirements.txt (
    echo [INFO] Installing backend dependencies...
    pip install --upgrade pip >nul
    pip install -r requirements.txt
) else (
    echo [ERROR] requirements.txt not found in query_server!
    exit /b 1
)

REM Start Flask backend in a new window
start "Flask Backend" cmd /k "cd /d %cd% && call venv\Scripts\activate && set FLASK_APP=app.py && flask run --host=127.0.0.1 --port=5000"
cd ..

REM --- Frontend Setup ---
echo [INFO] Setting up frontend...
cd ../frontend

if exist package.json (
    if not exist node_modules (
        echo [INFO] Installing frontend dependencies...
        npm install
    )
    echo [INFO] Starting frontend dev server...
    start "Frontend" cmd /k "cd /d %cd% && npm run dev -- --port 5173"
) else (
    echo [ERROR] package.json not found in frontend!
    exit /b 1
)
cd ..

REM --- Prompt for Data Import ---
echo.
echo Would you like to import data into the database now? (y/n)
set /p importdata=
if /i "%importdata%"=="y" (
    echo [INFO] Importing data using import_data.py...
    pushd scripts
    call ..\query_server\venv\Scripts\activate
    ..\query_server\venv\Scripts\python.exe import_data.py
    popd
    echo [INFO] Data import completed.
) else (
    echo [INFO] Skipping data import. You can run it later with: python -m scripts.import_data
)
REM --- Print Access URLs ---
echo.
echo [SUCCESS] Deployment completed successfully!
echo ---------------------------------------------
echo Backend API:   http://127.0.0.1:5000

echo.
echo [INFO] Current system status:
docker-compose ps

echo.
echo [INFO] Access URLs:
echo   Frontend: http://localhost
echo   Backend API: http://localhost:5000/api
echo   Health Check: http://localhost:5000/health
echo   System Stats: http://localhost:5000/api/stats

echo.
echo [INFO] Next steps:
echo   1. Open http://localhost in your browser
echo   2. If you haven't imported data yet, run: python -m scripts.import_data
echo   3. Check logs if needed: docker-compose logs
echo   4. Stop services: docker-compose down

pause 