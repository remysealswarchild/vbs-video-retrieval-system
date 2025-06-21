# VBS Video Retrieval System

A full-stack, multimodal video retrieval system for content-based search, built for research and competition use with **Video Browser Showdown (VBS)** integration.

---

## Project Overview

This system allows users to search a large video dataset using text, color, object, and time-based queries. It features:

- **Backend:** Python Flask API, PostgreSQL with pgvector for fast vector search, Dockerized for easy deployment.
- **Frontend:** React + Vite, modern UI for building and running complex queries.
- **Deployment:** All components run via Docker Compose for reproducibility and ease of use.
- **Video Playback:** Full video streaming and playback capabilities with proper CORS support.
- **🎯 VBS Integration:** Complete Video Browser Showdown competition support with DRES integration.

---

## 🎯 VBS Competition Features

### **Known-Item Search (KIS) Support**
- **DRES Integration** - Direct communication with Distributed Retrieval Evaluation Server
- **Competition Mode** - Dedicated GUI for VBS query management
- **Real-time Status** - Monitor DRES connection and active queries
- **Batch Submissions** - Submit multiple results efficiently

### **Quick VBS Setup**
```bash
# Enable VBS mode
export ENABLE_VBS=true
export DRES_BASE_URL=http://your-dres-server:8080
export DRES_USERNAME=your_username
export DRES_PASSWORD=your_password

# Deploy with VBS support
./deploy.sh
```

### **VBS Workflow**
1. **Connect to DRES** - Authenticate with the evaluation server
2. **Select Query** - Choose from active VBS queries
3. **Search Videos** - Use multimodal search to find candidates
4. **Submit Results** - Send KIS results directly to DRES

📖 **Full VBS Guide:** [VBS Integration Guide](VBS_INTEGRATION_GUIDE.md)

---

## 🎨 Frontend Architecture

### **React + Vite Frontend**

The frontend is built with modern React and Vite, providing a responsive and interactive user interface for video search and playback.

#### **Technology Stack**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library

#### **Key Features**
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Dark/Light Mode** - Automatic theme switching
- **Real-time Search** - Instant search results with loading states
- **Video Playback** - Full video player with timestamp seeking
- **Advanced Filtering** - Multiple search modalities in one interface
- **🎯 VBS Competition Mode** - Integrated DRES submission workflow

### **Component Architecture**

```
src/
├── App.tsx                    # Root application component
├── main.tsx                   # Application entry point
├── pages/
│   └── Home.tsx              # Main search interface
├── components/
│   ├── Header/               # Navigation and system status
│   ├── FilterPanel/          # Search filters and controls
│   ├── VideoGrid/            # Video results display
│   ├── VideoCard/            # Individual video display
│   ├── TimePicker/           # Time-based search controls
│   ├── ConnectionStatus/     # Backend connection indicator
│   ├── DRESStatus/           # 🎯 DRES connection status
│   ├── VBSCompetitionMode/   # 🎯 VBS competition interface
│   └── SearchSettingsPopup/  # Advanced search options
├── hooks/
│   ├── useSearchVideos.ts    # Search API integration
│   ├── useConnectionStatus.ts # Backend health monitoring
│   └── useDRES.ts            # 🎯 DRES integration hook
├── context/
│   └── QueryProvider.tsx     # Global state management
└── api/
    └── axios.ts              # HTTP client configuration
```

### **Core Components**

#### **1. FilterPanel Component**
The main search interface that provides multiple search modalities:

- **Text Search** - Natural language queries with semantic understanding
- **Color Search** - Color picker for visual similarity search
- **Object Search** - Search for specific objects detected in videos
- **Time-based Search** - Filter videos by duration or timestamp ranges
- **Media Upload** - Upload images/videos for similarity search

**Features:**
- Toggle-based interface for different search types
- Real-time validation and error handling
- Drag-and-drop file upload
- Color picker with RGB preview
- Time interval selection with validation

#### **2. VideoCard Component**
Displays individual video results with rich metadata:

- **Video Player** - HTML5 video player with controls
- **Metadata Display** - Score, timestamp, objects, text, colors
- **Interactive Overlays** - Full-screen player and submission modes
- **Timestamp Seeking** - Jump to specific moments in videos
- **Color Visualization** - Dominant color swatches
- **🎯 DRES Submission** - Direct submission to VBS evaluation server

**Features:**
- Automatic timestamp seeking on play
- Full-screen video overlay
- **🎯 VBS submission mode** for competition use
- Responsive design for different screen sizes
- Error handling for missing videos

#### **3. VideoGrid Component**
Responsive grid layout for displaying search results:

- **Responsive Layout** - Adapts to different screen sizes
- **Loading States** - Skeleton loading animations
- **Empty States** - Helpful messages when no results
- **Pagination** - Load more results as needed
- **🎯 VBS Integration** - Competition mode support

#### **4. 🎯 VBS Competition Mode Component**
Dedicated interface for VBS competition participation:

- **DRES Status Monitoring** - Real-time connection status
- **Active Queries List** - Browse and select available queries
- **Query Details** - View query information and instructions
- **Submission Interface** - Integrated submission workflow

### **State Management**

#### **React Hooks**
- `useState` for local component state
- `useEffect` for side effects and API calls
- `useRef` for DOM element references
- Custom hooks for reusable logic
- **🎯 `useDRES`** for VBS competition integration

#### **Context API**
- Global query state management
- Theme switching
- Connection status
- Search history
- **🎯 VBS competition state**

### **API Integration**

#### **HTTP Client**
- Axios for API requests
- Request/response interceptors
- Error handling and retry logic
- CORS configuration
- **🎯 DRES API integration**

#### **Real-time Updates**
- Connection status monitoring
- Automatic retry on connection loss
- Loading states for better UX
- Optimistic updates for search results
- **🎯 DRES status monitoring**

---

## 🔧 Backend Architecture

### **Flask API Server**

The backend is built with Python Flask, providing a robust API for video search and serving with AI-powered analysis capabilities.

#### **Technology Stack**
- **Flask** - Lightweight web framework for API development
- **PostgreSQL** - Primary database with pgvector extension
- **psycopg2** - PostgreSQL adapter for Python
- **pgvector** - Vector similarity search extension
- **Docker** - Containerized deployment
- **CORS** - Cross-origin resource sharing support
- **🎯 DRES Client** - VBS competition integration

#### **Core Features**
- **RESTful API** - Standard HTTP endpoints for all operations
- **Vector Search** - Fast similarity search using pgvector
- **Video Serving** - Direct file serving with proper headers
- **AI Integration** - YOLO, CLIP, and EasyOCR model integration
- **Error Handling** - Comprehensive error handling and logging
- **Performance** - Optimized database queries and caching
- **🎯 VBS Integration** - Complete DRES API support

### **API Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│  (Flask API)    │◄──►│  (PostgreSQL)   │
│                 │    │                 │    │                 │
│ • Search UI     │    │ • Search Logic  │    │ • Video Metadata│
│ • Video Player  │    │ • AI Processing │    │ • CLIP Embeddings│
│ • Filter Panel  │    │ • Video Serving │    │ • Object Data   │
│ • Responsive    │    │ • CORS Support  │    │ • Vector Search │
│ 🎯 VBS Mode     │    │ 🎯 DRES Client  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Video Files   │    │   AI Models     │    │   Analysis Data │
│                 │    │                 │    │                 │
│ • MP4 Videos    │    │ • YOLOv8 Large  │    │ • JSON Reports  │
│ • Organized     │    │ • CLIP ViT-B/32 │    │ • Frame Images  │
│ • Web-Ready     │    │ • EasyOCR       │    │ • Embeddings    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   🎯 DRES       │    │   🎯 VBS        │
│   Server        │    │   Competition   │
│                 │    │                 │
│ • Authentication│    │ • Query Mgmt    │
│ • Submissions   │    │ • Results       │
│ • Evaluation    │    │ • Scoring       │
└─────────────────┘    └─────────────────┘
```

### **Database Schema**

#### **Core Tables**

```sql
-- Videos table - stores video metadata
CREATE TABLE videos (
    video_id VARCHAR(50) PRIMARY KEY,
    original_filename VARCHAR(255),
    compressed_filename VARCHAR(255),
    duration_seconds FLOAT,
    fps FLOAT,
    compressed_file_size_bytes BIGINT,
    processing_date_utc TIMESTAMP,
    scene_change_timestamps INTEGER[],
    keyframes_analyzed_count INTEGER,
    analysis_status VARCHAR(50),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Video moments table - stores analysis results for each keyframe
CREATE TABLE video_moments (
    moment_id VARCHAR(100) PRIMARY KEY,
    video_id VARCHAR(50) REFERENCES videos(video_id),
    frame_identifier VARCHAR(50),
    timestamp_seconds FLOAT,
    keyframe_image_path TEXT,
    clip_embedding vector(512),  -- pgvector extension for similarity search
    detected_object_names TEXT[],
    extracted_search_words TEXT[],
    average_color_rgb INTEGER[],
    detailed_features JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **API Endpoints**

#### **Core Search Endpoints**
- `POST /api/search/text` - Text-based search
- `POST /api/search/color` - Color-based search
- `POST /api/search/objects` - Object-based search
- `POST /api/search/vector` - Vector similarity search
- `POST /api/search/multimodal` - Combined search
- `POST /api/search/temporal` - Time-based search

#### **Video Serving**
- `GET /api/videos/{video_id}/{filename}` - Serve video files
- `GET /api/stats` - System statistics

#### **Health & Status**
- `GET /health` - Backend health check (includes DRES status)
- `GET /` - Welcome message

#### **🎯 VBS Competition Endpoints**
- `GET /api/dres/status` - DRES connection status
- `POST /api/dres/submit` - Submit KIS result to DRES
- `GET /api/dres/queries` - Get active VBS queries
- `GET /api/dres/query/{query_id}` - Get query details
- `POST /api/dres/submit-batch` - Submit multiple results
- `GET /api/dres/history` - Get submission history

### **Video Serving**

#### **Video File Endpoint**
```
GET /api/videos/{video_id}/{filename}
```

**Features:**
- Direct file serving from dataset directory
- Proper CORS headers for video streaming
- Error handling for missing files
- Efficient streaming for large video files

#### **CORS Configuration**
```python
# Backend CORS setup
CORS(app, resources={
    r"/api/*": {"origins": ["http://localhost", "http://localhost:3000"]},
    r"/videos/*": {"origins": ["http://localhost", "http://localhost:3000"]}
})
```

### **AI Model Integration**

#### **YOLO Object Detection**
- **Model:** YOLOv8 Large (`yolov8l.pt`)
- **Purpose:** Object detection in video frames
- **Output:** Bounding boxes, object classes, confidence scores
- **Integration:** Pre-processed results stored in database

#### **CLIP Semantic Embeddings**
- **Model:** CLIP ViT-B/32
- **Purpose:** Semantic understanding of visual content
- **Output:** 512-dimensional embeddings
- **Storage:** pgvector extension for efficient similarity search

#### **EasyOCR Text Extraction**
- **Purpose:** Extract text from video frames
- **Output:** Detected text with bounding boxes
- **Use Case:** Search for videos containing specific text

### **🎯 DRES Integration**

#### **DRES Client**
The backend includes a comprehensive DRES client for VBS competition support:

```python
from dres_client import get_dres_client, submit_to_dres

# Submit a KIS result
success = submit_to_dres(
    query_id="query_123",
    video_id="00001",
    timestamp=45.2,
    confidence=0.95
)
```

#### **DRES Features**
- **Authentication** - Secure login to DRES server
- **Query Management** - Fetch and manage active VBS queries
- **Result Submission** - Submit Known-Item Search results
- **Batch Operations** - Submit multiple results efficiently
- **Status Monitoring** - Real-time connection and competition status
- **Error Handling** - Comprehensive error handling and retry logic

### **Performance Optimizations**

#### **Database Optimizations**
- **Indexed Fields** - Database indexes on search fields
- **Query Planning** - Optimized SQL query execution
- **Connection Pooling** - Efficient database connections
- **Vector Indexes** - pgvector indexes for fast similarity search

#### **API Optimizations**
- **Response Caching** - Cache frequently requested data
- **Batch Processing** - Efficient bulk operations
- **Error Handling** - Graceful error responses
- **Logging** - Comprehensive request/response logging

### **Error Handling**

#### **Database Errors**
- Connection failures with retry logic
- Query errors with detailed error messages
- Transaction rollback on failures
- Connection pooling for reliability

#### **API Errors**
- HTTP status codes for different error types
- Detailed error messages for debugging
- Graceful degradation when services are unavailable
- **🎯 DRES error handling** with retry mechanisms

#### **Video Serving Errors**
- File not found handling
- Invalid video ID validation
- CORS error prevention
- Streaming error recovery

---

## 🚀 Quick Start

### **Prerequisites**

1. **System Requirements**
   - Docker & Docker Compose installed
   - 8GB+ RAM available
   - 50GB+ free disk space
   - Modern web browser

2. **Dataset Preparation**
   - Download V3C1-200 dataset (see [Dataset Setup](#dataset-setup))
   - Extract and organize video files
   - Run data import script

### **Deployment**

#### **Option 1: Automated Deployment (Recommended)**

**Windows:**
```cmd
cd vbs-video-retrieval-system
.\deploy.bat
```

**Linux/Mac:**
```bash
cd vbs-video-retrieval-system
chmod +x deploy.sh
./deploy.sh
```

#### **Option 2: Manual Deployment**

```bash
# 1. Download and prepare dataset
python scripts/download_dataset.py

# 2. Build and start services
docker-compose up --build -d

# 3. Initialize database
docker cp database/schema.sql video_retrieval_postgres:/schema.sql
docker exec video_retrieval_postgres psql -U postgres -d videodb_creative_v2 -f /schema.sql

# 4. Import data
python import_data_fixed.py

# 5. Access the system
# Frontend: http://localhost
# Backend: http://localhost:5000/api
```

### **🎯 VBS Competition Setup**

```bash
# 1. Enable VBS mode
export ENABLE_VBS=true

# 2. Configure DRES connection
export DRES_BASE_URL=http://your-dres-server:8080
export DRES_USERNAME=your_username
export DRES_PASSWORD=your_password

# 3. Deploy with VBS support
./deploy.sh

# 4. Verify DRES connection
curl http://localhost:5000/api/dres/status
```

---

## 📦 Dependencies and Requirements

### **Requirements Integration**

The system uses a unified `requirements.txt` file that consolidates all dependencies from both the main project and the query server. This ensures consistency across all components.

#### **Requirements Structure**
```
requirements.txt                    # Main comprehensive requirements file
├── Core Libraries                 # numpy, Pillow, opencv-python
├── AI/ML Libraries               # torch, torchvision, CLIP, YOLO, EasyOCR
├── Web Framework                 # Flask, Flask-CORS, Werkzeug
├── Database & Vector Search      # psycopg2-binary, pgvector
├── VBS Competition Integration   # requests (for DRES communication)
├── Utility Libraries             # Various supporting packages
├── Configuration & Logging       # python-dotenv, loguru
└── Development & Testing         # pytest, pytest-flask
```

#### **Key Dependencies**

**AI/ML Processing:**
- **PyTorch 2.3.0** - Deep learning framework
- **CLIP** - OpenAI's multimodal model for text-image understanding
- **YOLOv8** - Object detection via Ultralytics
- **EasyOCR** - Text extraction from video frames

**Web & Database:**
- **Flask 3.0.3** - Web API framework
- **PostgreSQL + pgvector** - Database with vector search
- **psycopg2-binary** - PostgreSQL adapter

**VBS Integration:**
- **requests** - HTTP client for DRES communication

#### **Requirements Management**

**Automatic Setup:**
```bash
# The deployment script automatically handles requirements integration
./deploy.sh

# Or run requirements setup manually
python scripts/setup_requirements.py
```

**Manual Setup:**
```bash
# Install dependencies
pip install -r requirements.txt

# For development (includes testing tools)
pip install -r requirements.txt[dev]
```

**Docker Integration:**
- The Dockerfile automatically uses the main `requirements.txt`
- Build context ensures all dependencies are available
- No need for separate requirements files in subdirectories

#### **Version Management**

**Pinned Versions:**
- All critical dependencies have pinned versions for reproducibility
- AI/ML libraries use specific versions for compatibility
- Web framework uses stable, tested versions

**GPU Support:**
- PyTorch includes CUDA support for GPU acceleration
- Ensure CUDA drivers are installed for optimal performance
- Fallback to CPU-only mode if GPU unavailable

**Development vs Production:**
```bash
# Development (includes testing tools)
pip install -r requirements.txt

# Production (minimal dependencies)
pip install -r requirements.txt --no-dev
```

---

## 📊 System Performance

### **Performance Metrics**

#### **Search Performance**
- **Query Response Time:** < 500ms for typical searches
- **Video Loading Time:** < 2s for video playback
- **Concurrent Users:** Supports 10+ simultaneous users
- **Database Queries:** Optimized with proper indexing

#### **Resource Usage**
- **Memory Usage:** ~4GB RAM for full system
- **CPU Usage:** Moderate during search operations
- **Disk Space:** ~50GB for complete dataset
- **Network:** Efficient video streaming

### **Scalability Considerations**

#### **Horizontal Scaling**
- **Load Balancing** - Multiple backend instances
- **Database Clustering** - PostgreSQL read replicas
- **CDN Integration** - Static asset delivery
- **Caching Layer** - Redis for result caching

#### **Vertical Scaling**
- **Resource Limits** - Docker resource constraints
- **Memory Optimization** - Efficient data structures
- **CPU Optimization** - Parallel processing
- **Storage Optimization** - Compressed video storage

---

## 🔧 Configuration and Customization

### **Environment Configuration**

#### **Backend Configuration**
```bash
# Database
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=videodb_creative_v2
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# Video Dataset
VIDEO_DATASET_PATH=/app/dataset
MODEL_PATH=/app/models

# 🎯 VBS Configuration
DRES_BASE_URL=http://localhost:8080
DRES_USERNAME=vbs_user
DRES_PASSWORD=vbs_password
ENABLE_VBS=true
```

#### **Frontend Configuration**
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_VIDEO_BASE_URL=http://localhost:5000/api/videos
VITE_APP_TITLE=VBS Video Retrieval System

# 🎯 VBS Configuration
VITE_ENABLE_VBS=true
VITE_DRES_BASE_URL=http://localhost:5000/api/dres
```

### **Customization Options**

#### **UI Customization**
- **Theme Colors** - Customizable color scheme
- **Layout Options** - Adjustable grid layouts
- **Component Styling** - CSS module customization
- **Responsive Breakpoints** - Mobile-first design

#### **Search Customization**
- **Search Weights** - Adjustable search criteria weights
- **Result Limits** - Configurable result counts
- **Filter Options** - Customizable filter panels

#### **🎯 VBS Customization**
- **DRES Endpoints** - Configurable DRES server URLs
- **Submission Workflow** - Customizable submission process
- **Competition UI** - Adjustable competition interface

---

## 🧪 Testing and Validation

### **System Testing**

#### **Backend Testing**
```bash
# Health check
curl http://localhost:5000/health

# Search API test
curl -X POST http://localhost:5000/api/search/text \
  -H "Content-Type: application/json" \
  -d '{"query": "person", "limit": 5}'

# 🎯 DRES API test
curl http://localhost:5000/api/dres/status
```

#### **Frontend Testing**
1. **Load Interface** - Verify UI loads correctly
2. **Search Functionality** - Test all search modalities
3. **Video Playback** - Confirm videos play properly
4. **🎯 VBS Features** - Test competition mode

### **Performance Testing**

#### **Load Testing**
```bash
# Test search performance
ab -n 100 -c 10 -p search_payload.json \
  -T application/json http://localhost:5000/api/search/text
```

#### **Video Streaming Test**
```bash
# Test video serving
curl -I http://localhost:5000/api/videos/00001/00001.mp4
```

---

## 🔍 Troubleshooting

### **Common Issues**

#### **Videos Not Playing**
```bash
# Check video files exist
ls Dataset/V3C1-200/00001/

# Verify video serving
curl -I http://localhost:5000/api/videos/00001/00001.mp4

# Check backend logs
docker-compose logs backend --tail=20
```

#### **Database Issues**
```bash
# Check PostgreSQL status
docker-compose ps postgres

# Restart database
docker-compose restart postgres

# Verify schema
docker exec video_retrieval_postgres psql -U postgres -d videodb_creative_v2 -c "\\dt"
```

#### **🎯 DRES Connection Issues**
```bash
# Check DRES status
curl http://localhost:5000/api/dres/status

# Verify credentials
echo $DRES_USERNAME $DRES_PASSWORD

# Test DRES connection
curl -X POST http://localhost:5000/api/dres/submit \
  -H "Content-Type: application/json" \
  -d '{"query_id": "test", "video_id": "00001", "timestamp": 0}'
```

### **Useful Commands**

```bash
# Service management
docker-compose ps
docker-compose logs backend
docker-compose restart

# Database operations
docker exec video_retrieval_postgres psql -U postgres -d videodb_creative_v2 -c "SELECT COUNT(*) FROM videos;"

# 🎯 VBS operations
python -c "from dres_client import test_dres_connection; print(test_dres_connection())"
```

---

## 📚 Documentation

### **Core Documentation**
- [API Documentation](API_DOCUMENTATION.md) - Complete API reference
- [System Summary](COMPLETE_SYSTEM_SUMMARY.md) - Detailed system overview
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Step-by-step deployment instructions

### **🎯 VBS Documentation**
- [VBS Integration Guide](VBS_INTEGRATION_GUIDE.md) - Complete VBS competition guide
- [DRES API Reference](VBS_INTEGRATION_GUIDE.md#api-reference) - DRES client documentation

### **Development Resources**
- [Database Schema](database/schema.sql) - Database structure
- [Frontend Components](frontend/src/components/) - React component documentation
- [Backend API](query_server/app.py) - Flask API implementation

---

## 🤝 Contributing

### **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### **Code Standards**
- **Python:** PEP 8 style guide
- **TypeScript:** ESLint configuration
- **Documentation:** Comprehensive docstrings and comments
- **Testing:** Unit tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **VBS Community** - For the Video Browser Showdown competition framework
- **DRES Team** - For the Distributed Retrieval Evaluation Server
- **Open Source Contributors** - For the various libraries and tools used

---

This system provides a complete solution for video retrieval with full VBS competition support, enabling researchers and developers to participate in the Video Browser Showdown with a modern, efficient, and user-friendly interface.