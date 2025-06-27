# 🚀 VBS Video Retrieval System – Deployment Guide

## Overview

This guide will help you set up, deploy, and run the full-stack video retrieval system, including the database, backend, frontend, and data import. It covers both Docker Compose and Windows batch script (`deploy.bat`) workflows.

---

## 1. Prerequisites

- **Docker Desktop** (for database and full-stack deployment)
- **Python 3.10+** (for backend and scripts)
- **Node.js 18+** (for frontend)
- **Windows** (for `deploy.bat`) or any OS for Docker Compose

---

## 2. Project Structure

```
trial_new_project/
├── vbs-video-retrieval-system/
│   ├── query_server/         # Flask API backend
│   ├── database/             # DB schema, init scripts
│   ├── Dataset/              # Video data, frames, JSONs
│   ├── scripts/              # Data import, utility scripts
│   ├── docker-compose.yml    # Full stack deployment
│   ├── deploy.bat            # Windows batch deploy script
│   └── ...
├── frontend/                 # React app
└── ...
```

---

## 3. Quick Start (Recommended: Docker Compose)

1. **Start Docker Desktop.**
2. **Open a terminal and navigate to:**
   ```
   cd vbs-video-retrieval-system
   ```
3. **Run:**
   ```
   docker-compose up --build
   ```
   - This will start:
     - **Postgres** (with pgvector)
     - **Backend** (Flask API)
     - **Frontend** (React app)
4. **Access your services:**
   - Backend API: [http://localhost:5000](http://localhost:5000)
   - Swagger UI: [http://localhost:5000/apidocs](http://localhost:5000/apidocs)
   - Frontend: [http://localhost](http://localhost)

---

## 4. Windows Local Development (`deploy.bat`)

1. **Double-click or run** `deploy.bat` in `vbs-video-retrieval-system`.
2. The script will:
   - Start the database (Docker Compose)
   - Set up and run the backend (Flask, in a new terminal)
   - Set up and run the frontend (React, in a new terminal)
   - Prompt you to import data (from JSONs to DB)
3. **Follow the prompts** in the terminal.

---

## 5. Data Import

- If you skip data import during deploy, you can run it manually:
  ```
  cd vbs-video-retrieval-system
  python -m scripts.import_data
  ```
- This will import all JSON analysis reports into the database.

---

## 6. Updating/Managing Data

- Use `replace_json_in_all_matching_subfolders.py` to update JSONs in the dataset from multiple sources.
- Use `import_data.py` to import all JSONs into the database.

---

## 7. API Endpoints

- `/api/videos/<video_id>/<filename>`: Serve video files
- `/api/videos/<video_id>/frame/<frame_id>`: Serve frame images
- `/api/explore/<video_id>`: List all frames for a video
- `/api/search/text`, `/api/search/color`, `/api/search/vector`, `/api/search/objects`, `/api/search/multimodal`: Search endpoints
- `/api/dres/*`: DRES competition endpoints
- `/apipdocs`: Swagger/OpenAPI documentation

---

## 8. Troubleshooting

- **Database connection errors:** Ensure Docker is running and the DB is healthy.
- **Data not imported:** Run the import script manually as shown above.
- **Port conflicts:** Make sure ports 5000 (backend), 5432 (Postgres), and 80/5173 (frontend) are free.
- **Windows:** Always use the provided `deploy.bat` for easiest setup.

---

## 9. Stopping the System

- **Docker Compose:**  
  In `vbs-video-retrieval-system`, run:
  ```
  docker-compose down
  ```
- **deploy.bat:**  
  Close the opened backend and frontend terminal windows.  
  To stop the database, run:
  ```
  docker-compose down
  ```

---

## 10. Additional Notes

- For production, consider using Nginx for the frontend and securing your database.
- For advanced configuration, see the comments in `docker-compose.yml` and `deploy.bat`.
- For more details, see the main `README.md`.

## Frontend Setup and Usage

The frontend is located in the `frontend/` directory and provides a modern, responsive UI for video search and browsing.

### Features
- Sidebar filter panel (text, color, file, objects, time interval, etc.)
- Responsive video grid and video cards with player and DRES submission
- Connection status indicators (backend & DRES)
- Settings popup for advanced search
- Light/dark mode
- Mock data for development, easy switch to real API

### Running the Frontend (Development)
1. Open a terminal and navigate to the `frontend/` directory:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
2. Open your browser to http://localhost:3000 (or the port shown by Vite).

### Running the Frontend (Production/Full System)
- The frontend is automatically started by the deployment batch script (`deploy.bat`) or via Docker Compose.
- No manual steps are needed if using these methods; the frontend will be available at the configured port (default: 3000).

### Building for Production
To build the frontend for production (static files in `frontend/dist/`):
```sh
cd frontend
npm run build
```

### Main Entry Points
- `frontend/src/pages/Home.tsx`: Main page and layout
- `frontend/src/components/`: UI components (VideoGrid, VideoCard, FilterPanel, etc.)
- `frontend/public/index.html`: HTML entry point

For more details, see `frontend/README.md`. 