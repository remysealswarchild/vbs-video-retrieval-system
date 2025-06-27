# Video & Image Content-Based Retrieval System

## Project Overview
This project is a full-stack content-based video retrieval system designed for fast and accurate search of video segments based on text, image, color, and object queries. It is built for research, competition, and educational use, and is compatible with the VBS (Video Browser Showdown) evaluation framework.

**Key Features:**
- Video and image search by text, color, object, and image similarity
- Fast vector search using pgvector in PostgreSQL
- Modern React frontend for interactive search and result inspection
- Flask backend API with DRES (competition) integration and Swagger docs
- Modular extraction pipeline (YOLO, CLIP, EasyOCR, OpenCV, Pillow, FFMPEG)
- Docker Compose and batch script deployment for easy setup

## System Architecture
- **Frontend:** React (Vite, Mantine UI)
- **Backend:** Flask API (with DRES integration, Swagger UI)
- **Database:** PostgreSQL + pgvector (Dockerized)
- **Storage:** Frames and compressed videos in dataset folder
- **Extraction:** Python scripts for feature extraction and JSON report generation

## Folder Structure
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

## Setup & Deployment

### 1. **Using Docker Compose (Recommended)**
- Make sure Docker Desktop is running.
- In `vbs-video-retrieval-system`, run:
  ```sh
  docker-compose up --build
  ```
- This will start the database, backend, and frontend.
- Access:
  - Backend API: [http://localhost:5000](http://localhost:5000)
  - Swagger UI: [http://localhost:5000/apidocs](http://localhost:5000/apidocs)
  - Frontend: [http://localhost](http://localhost)

### 2. **Using deploy.bat (Windows, for local dev)**
- Double-click or run `deploy.bat` in `vbs-video-retrieval-system`.
- This will:
  - Start the database (Docker Compose)
  - Set up and run the backend (Flask)
  - Set up and run the frontend (React)
  - Prompt to import data (from JSONs to DB)
- Follow the prompts in the terminal.

### 3. **Manual Import of Data**
- If you skip data import during deploy, you can run:
  ```sh
  cd vbs-video-retrieval-system
  python -m scripts.import_data
  ```
- This will import all JSON analysis reports into the database.

## API Endpoints (Backend)
- `/api/videos/<video_id>/<filename>`: Serve video files
- `/api/videos/<video_id>/frame/<frame_id>`: Serve frame images
- `/api/explore/<video_id>`: List all frames for a video
- `/api/search/text`, `/api/search/color`, `/api/search/vector`, `/api/search/objects`, `/api/search/multimodal`: Search endpoints
- `/api/dres/*`: DRES competition endpoints
- `/apipdocs`: Swagger/OpenAPI documentation

## Frontend (React + TypeScript)

The frontend is a modern, responsive web application built with React, TypeScript, and Vite. It provides a user-friendly interface for searching, filtering, and browsing video (and image) content, and integrates tightly with the backend and DRES evaluation system.

### Features
- Sidebar filter panel (text, color, file, objects, time interval, etc.)
- Responsive video grid and video cards with player and DRES submission
- Connection status indicators (backend & DRES)
- Settings popup for advanced search
- Light/dark mode
- Mock data for development, easy switch to real API

### Directory Structure (frontend/src)
- `pages/` – Main pages (e.g., `Home.tsx`)
- `components/` – UI components (VideoGrid, VideoCard, FilterPanel, etc.)
- `hooks/` – Custom React hooks for API and state
- `context/` – Context providers (e.g., DRES integration)
- `data/` – Mock data for development
- `api/` – API utilities (e.g., axios config)
- `assets/` – Static assets (e.g., icons)
- `styles/` – Global and modular CSS

### Running the Frontend

**Standalone (for development):**
```sh
cd frontend
npm install
npm run dev
```
Visit http://localhost:3000 (or the port shown by Vite).

**As part of the full system:**
- Use the provided deployment scripts or Docker Compose (see below and in the deployment guide).

For more details, see `frontend/README.md`.

## Data Extraction & Import
- Use provided scripts to extract features (YOLO, CLIP, OCR, color, etc.) and generate JSON reports
- Use `replace_json_in_all_matching_subfolders.py` to update JSONs in the dataset
- Use `import_data.py` to import all JSONs into the database

## Requirements
- Docker Desktop (for full stack deployment)
- Python 3.10+ (for backend and scripts)
- Node.js 18+ (for frontend)

## Troubleshooting
- If you see database connection errors, ensure Docker is running and the DB is healthy
- If data is not imported, run the import script manually
- For Windows, always use the provided `deploy.bat` for easiest setup

## License
MIT or as specified by your course/institution.

---
For more details, see the `DEPLOYMENT_GUIDE.md` in the project. 