# 🌍 EcoVision - Environmental Prediction & Visualization Platform

EcoVision is a full-stack web application that combines environmental data visualization, AI-powered insights, and predictive analytics to monitor and understand global climate and ecological changes. It provides users with dynamic visualizations, data-driven predictions, interactive geographical maps, and deep AI-powered insights concerning environmental trends and actionable solutions.

The application visualizes the tangible impacts of climate change across critical domains: **Forests**, **Glaciers**, **Water Resources**, and **Pollution**, with real-time predictions and AI-driven recommendations.

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Backend API](#backend-api)
- [Frontend Setup](#frontend-setup)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Core Functionality
- **Environmental Dashboard:** Monitor global environmental metrics with real-time statistics and trends
- **Regional Analysis:** Explore specific regions (Amazon Basin, Congo Basin, Himalayas, Alps, Andes, etc.)
- **Historical Data Visualization:** View historical environmental data trends with interactive charts
- **Predictive Analytics:** Generate AI-assisted predictions for future environmental scenarios
- **Solutions Repository:** Access region-specific environmental solutions with prioritization and impact estimates
- **AI-Powered Chatbot:** Interact with a Gemini-powered chatbot for environmental insights and recommendations
- **Interactive Mapping:** Visualize environmental data geographically using Leaflet maps
- **Theme Support:** Light/Dark mode toggle for user preference

### Pages & Dashboards
- **Dashboard:** Global overview with key metrics and world map
- **Forests:** Forest coverage analysis and predictions
- **Glaciers:** Glacier retreat tracking and forecasts
- **Water:** Water resources and stress analysis
- **Pollution:** Air and environmental pollution monitoring
- **Solutions:** Actionable solutions for environmental challenges
- **Search:** Global search across environmental data
- **Methodology:** Explanation of calculation methods and data sources

---

## 🛠️ Tech Stack

### Frontend (Next.js Application)
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15.1.0 | React framework with App Router and SSR |
| **React** | 19.0.0 | Component-based UI library |
| **TypeScript** | 5.7.3 | Type-safe JavaScript |
| **Chart.js** | 4.4.7 | Data visualization library |
| **React-ChartJS-2** | 5.2.0 | React wrapper for Chart.js |
| **Leaflet** | 1.9.4 | Interactive mapping library |
| **Mermaid** | 11.4.1 | Markdown-inspired diagram rendering |
| **Axios** | 1.7.9 | HTTP client for API calls |
| **Tailwind CSS** | Latest | Utility-first CSS framework (inferred) |
| **Font Awesome** | 6.4.0 | Icon library |

### Backend (Node.js/Express Application)
| Technology | Version | Purpose |
|---|---|---|
| **Express.js** | 4.21.2 | REST API framework |
| **Node.js** | 18+ | JavaScript runtime |
| **TypeScript** | 5.7.3 | Type-safe JavaScript |
| **Prisma** | 6.4.1 | ORM for database management |
| **@google/generative-ai** | 0.21.0 | Google Gemini AI integration |
| **MySQL** | N/A | Relational database |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing |
| **dotenv** | 16.4.7 | Environment variable management |
| **ts-node-dev** | 2.0.0 | TypeScript development server |

### Root-Level Dependencies
| Technology | Version | Purpose |
|---|---|---|
| **Concurrently** | 8.2.2 | Run multiple npm scripts simultaneously |

---

## 📁 Project Structure

```
eco-visualizer2/
├── package.json                          # Root workspace configuration
├── ecovision/
│   ├── package.json                      # Monorepo root package
│   ├── README.md                         # Project documentation
│   │
│   ├── backend/                          # Express API Server
│   │   ├── package.json                  # Backend dependencies
│   │   ├── tsconfig.json                 # TypeScript configuration
│   │   ├── backend_errors.txt            # Error logs
│   │   ├── models.json                   # Data models configuration
│   │   │
│   │   ├── prisma/
│   │   │   └── schema.prisma             # Database schema definition
│   │   │
│   │   └── src/
│   │       ├── index.ts                  # Express server entry point
│   │       ├── controllers/              # Business logic layer
│   │       │   ├── chat.controller.ts    # Gemini AI chat handler
│   │       │   ├── predictions.controller.ts  # Prediction queries
│   │       │   ├── regions.controller.ts      # Region data management
│   │       │   └── solutions.controller.ts    # Solutions retrieval
│   │       ├── routes/                   # API route definitions
│   │       │   ├── chat.ts               # Chat endpoint routes
│   │       │   ├── predictions.ts        # Prediction endpoint routes
│   │       │   ├── regions.ts            # Region endpoint routes
│   │       │   └── solutions.ts          # Solutions endpoint routes
│   │       └── prisma/
│   │           └── seed.ts               # Database seeding script
│   │
│   └── frontend/                         # Next.js React Application
│       ├── package.json                  # Frontend dependencies
│       ├── tsconfig.json                 # TypeScript configuration
│       ├── next.config.js                # Next.js configuration
│       ├── next-env.d.ts                 # Next.js TypeScript definitions
│       ├── frontend_errors.txt           # Error logs
│       │
│       ├── app/                          # Next.js App Router
│       │   ├── layout.tsx                # Root layout with sidebar, header, chatbot
│       │   ├── page.tsx                  # Redirects to /dashboard
│       │   ├── dashboard/
│       │   │   └── page.tsx              # Dashboard home with world map
│       │   ├── forests/
│       │   │   └── page.tsx              # Forest coverage analysis
│       │   ├── glaciers/
│       │   │   └── page.tsx              # Glacier retreat tracking
│       │   ├── water/
│       │   │   └── page.tsx              # Water resources analysis
│       │   ├── pollution/
│       │   │   └── page.tsx              # Pollution monitoring
│       │   ├── solutions/
│       │   │   └── page.tsx              # Solutions repository
│       │   ├── search/
│       │   │   └── page.tsx              # Global search functionality
│       │   └── methodology/
│       │       └── page.tsx              # Methodology & data sources
│       │
│       ├── components/                   # Reusable React Components
│       │   ├── layout/
│       │   │   ├── Header.tsx            # Top navigation header
│       │   │   └── Sidebar.tsx           # Left navigation sidebar
│       │   ├── chatbot/
│       │   │   └── ChatbotPanel.tsx      # AI chatbot interface
│       │   ├── maps/
│       │   │   └── WorldMap.tsx          # Leaflet interactive map
│       │   ├── charts/
│       │   │   └── PredictionChart.tsx   # Chart.js data visualization
│       │   ├── solutions/
│       │   │   └── SolutionModal.tsx     # Solution details modal
│       │   └── ui/
│       │       ├── StatCard.tsx          # Statistics card component
│       │       └── ThemeToggle.tsx       # Light/Dark mode switcher
│       │
│       ├── hooks/                        # Custom React Hooks
│       │   ├── useChat.ts                # Chat state management
│       │   ├── usePredictions.ts         # Predictions data fetching
│       │   └── useRegions.ts             # Regions data fetching
│       │
│       ├── lib/                          # Utility Libraries
│       │   ├── api.ts                    # Axios API client configuration
│       │   └── chatapi.ts                # Chat API utilities (empty)
│       │
│       └── styles/
│           └── globals.css               # Global stylesheets
```

---

## 🗄️ Database Schema

The application uses a **MySQL relational database** managed by Prisma. The schema includes the following models:

### Core Models

#### `Region`
Represents geographical regions being monitored.
```
- regionId (int, primary key, auto-increment)
- name (string, max 100 chars)
- type (enum: forest, glacier, coastal, urban)
- latitude (float)
- longitude (float)
- areaSqkm (float) - area in square kilometers
- description (text, nullable)
- createdAt (datetime, auto-set)
```
**Relations:** One-to-Many with HistoricalData, PredictionData, RegionSolution

#### `HistoricalData`
Stores historical environmental metrics for regions.
```
- dataId (int, primary key)
- regionId (int, foreign key)
- year (int)
- forestCoverSqkm (float, nullable)
- glacierAreaSqkm (float, nullable)
- temperatureCelsius (float, nullable)
- precipitationMm (float, nullable)
```
**Unique Constraint:** (regionId, year)

#### `PredictionData`
Stores predicted environmental metrics for future years.
```
- predictionId (int, primary key)
- regionId (int, foreign key)
- year (int)
- forestCoverSqkm (float, nullable)
- glacierAreaSqkm (float, nullable)
- temperatureCelsius (float, nullable)
- precipitationMm (float, nullable)
- confidenceLevel (float, nullable)
- calculationMethod (string, max 100 chars)
```
**Unique Constraint:** (regionId, year, calculationMethod)

#### `Solution`
Environmental mitigation strategies and solutions.
```
- solutionId (int, primary key)
- name (string, max 100 chars)
- type (enum: afforestation, urban_planning, glacier_protection, flood_management)
- description (text)
- implementationSteps (text)
- expectedImpact (text)
```
**Relations:** One-to-Many with RegionSolution

#### `RegionSolution`
Junction table linking regions with applicable solutions.
```
- regionSolutionId (int, primary key)
- regionId (int, foreign key)
- solutionId (int, foreign key)
- priorityLevel (enum: low, medium, high, critical)
- estimatedCostUsd (float, nullable)
- estimatedImpactPercentage (float, nullable)
```
**Unique Constraint:** (regionId, solutionId)

#### `DataSource`
Metadata about data sources used in the application.
```
- sourceId (int, primary key)
- name (string, max 100 chars)
- url (string, max 255 chars, nullable)
- description (text, nullable)
- dataType (enum: satellite, climate, geological, local)
- lastUpdated (datetime, auto-updated)
```

---

## 🔌 Backend API

### Express Server Setup
**File:** [src/index.ts](src/index.ts)

The Express server:
- Runs on port **5000** (configurable via `PORT` env variable)
- Enables CORS for frontend requests from `http://localhost:3000`
- Mounts four API route modules
- Includes a health check endpoint

### API Routes

#### 1. **Regions API**
**Base URL:** `GET /api/regions`

**Endpoints:**
- `GET /api/regions` - Fetch all regions with historical data
  - Response: Array of region objects with nested `historicalData` sorted by year
  - Use Case: Dashboard, map initialization, region listing

- `GET /api/regions/:id` - Fetch specific region with all related data
  - Response: Single region object with:
    - `historicalData` - Historical metrics (sorted by year)
    - `predictionData` - Future predictions (sorted by year)
    - `regionSolutions` - Applicable solutions with priorities
  - Use Case: Detailed region analysis pages

**Controller:** [controllers/regions.controller.ts](src/controllers/regions.controller.ts)

#### 2. **Predictions API**
**Base URL:** `GET /api/predictions`

**Endpoints:**
- `GET /api/predictions` - Fetch all predictions
- `GET /api/predictions?regionId=1` - Fetch predictions for specific region
  - Query Parameters:
    - `regionId` (optional, number) - Filter by region
  - Response: Array of prediction objects sorted by year
  - Includes: predictionId, year, metrics (forest, glacier, temperature, precipitation), confidence level, calculation method, region details

**Controller:** [controllers/predictions.controller.ts](src/controllers/predictions.controller.ts)

#### 3. **Solutions API**
**Base URL:** `GET /api/solutions`

**Endpoints:**
- `GET /api/solutions` - Fetch all environmental solutions
  - Response: Array of solution objects with:
    - Solution details (name, type, description, implementation steps)
    - Related regions through `regionSolutions` junction
  - Use Case: Solutions page, filtering by region or type

**Controller:** [controllers/solutions.controller.ts](src/controllers/solutions.controller.ts)

#### 4. **Chat API (AI)**
**Base URL:** `POST /api/chat`

**Endpoints:**
- `POST /api/chat` - Send a question/query to Gemini AI
  - Request Body:
    ```json
    {
      "query": "How does deforestation in the Amazon affect global temperatures?"
    }
    ```
  - Response (Structured):
    ```json
    {
      "details": "<h4>HTML formatted answer</h4><p>...</p>",
      "sources": [
        { "name": "Source name", "percentage": 40 },
        { "name": "Another source", "percentage": 30 }
      ],
      "solutions": {
        "government": ["Solution 1", "Solution 2", "Solution 3"],
        "community": ["Solution 1", "Solution 2", "Solution 3"],
        "individual": ["Solution 1", "Solution 2", "Solution 3"]
      }
    }
    ```
  - Fallback: If no valid Gemini API key, returns mock response
  - Error Handling: 429 for rate limit, 500 for other errors

**Controller:** [controllers/chat.controller.ts](src/controllers/chat.controller.ts)
**Features:**
- Integration with Google Generative AI (Gemini 2.5 Flash)
- Secure API key handling with fallback mock responses
- HTML-formatted responses for rich formatting
- Context-aware solutions at three levels (government, community, individual)

#### 5. **Health Check**
- `GET /api/health` - Server health status
  - Response: `{ "status": "ok" }`

---

## 🎨 Frontend Setup

### Pages & Components

#### Main Pages (in `/app`)
| Page | File | Purpose |
|---|---|---|
| **Dashboard** | `dashboard/page.tsx` | Global overview with metrics, world map, and key statistics |
| **Forests** | `forests/page.tsx` | Forest coverage analysis, deforestation tracking |
| **Glaciers** | `glaciers/page.tsx` | Glacier retreat visualization and predictions |
| **Water** | `water/page.tsx` | Water resources analysis and stress indicators |
| **Pollution** | `pollution/page.tsx` | Air and environmental pollution monitoring |
| **Solutions** | `solutions/page.tsx` | Repository of environmental solutions with filtering |
| **Search** | `search/page.tsx` | Global search across environmental data |
| **Methodology** | `methodology/page.tsx` | Explanation of calculation methods and data sources |

#### Layout Components
| Component | File | Purpose |
|---|---|---|
| **Header** | `components/layout/Header.tsx` | Top navigation bar with branding |
| **Sidebar** | `components/layout/Sidebar.tsx` | Left sidebar with page navigation links |

#### Specialized Components
| Component | File | Purpose |
|---|---|---|
| **ChatbotPanel** | `components/chatbot/ChatbotPanel.tsx` | AI chatbot interface with message display and input |
| **WorldMap** | `components/maps/WorldMap.tsx` | Leaflet-based interactive world map with markers |
| **PredictionChart** | `components/charts/PredictionChart.tsx` | Chart.js visualization for prediction data |
| **SolutionModal** | `components/solutions/SolutionModal.tsx` | Modal displaying solution details |

#### UI Components
| Component | File | Purpose |
|---|---|---|
| **StatCard** | `components/ui/StatCard.tsx` | Card displaying key statistics with icons |
| **ThemeToggle** | `components/ui/ThemeToggle.tsx` | Light/Dark mode switcher |

### Custom Hooks

#### `useChat()` - [hooks/useChat.ts](hooks/useChat.ts)
Manages chat state and communication with the Gemini AI backend.

**Interface:**
```typescript
interface Message {
  content: string | ChatResponse;
  type: 'user' | 'bot';
}

interface ChatResponse {
  details: string;
  sources: Array<{ name: string; percentage: number }>;
  solutions: {
    government: string[];
    community: string[];
    individual: string[];
  };
}
```

**Returns:**
- `messages: Message[]` - Array of chat messages
- `isTyping: boolean` - Loading state while waiting for response
- `sendMessage(query: string)` - Function to send chat query
- `setMessages()` - Direct state setter

**Features:**
- Error handling with fallback responses
- Supports both simple text and structured responses
- Logs API interactions for debugging

#### `usePredictions()` - [hooks/usePredictions.ts](hooks/usePredictions.ts)
Fetches prediction data for regions or globally.

**Parameters:**
- `regionId?: number` - Optional region ID to filter predictions

**Returns:**
- `predictions: Prediction[]` - Array of prediction objects
- `loading: boolean` - Loading state
- `error: string | null` - Error message if fetch fails

**Features:**
- Auto-fetches on mount and when regionId changes
- Includes year, metrics, and confidence levels

#### `useRegions()` & `useRegion()` - [hooks/useRegions.ts](hooks/useRegions.ts)
Fetches region data globally or for specific regions.

**useRegions() Returns:**
- `regions: Region[]` - All regions with historical data
- `loading: boolean` - Loading state
- `error: string | null` - Error message

**useRegion(id: number | null) Returns:**
- `region: Region | null` - Specific region with all related data
- `loading: boolean` - Loading state
- `error: string | null` - Error message

### API Configuration

**File:** [lib/api.ts](lib/api.ts)

Axios instance configured with:
- Base URL: `http://localhost:5000` (configurable via `NEXT_PUBLIC_API_URL`)
- Content-Type: `application/json`
- Default error handling

---

## 🚀 Getting Started

### Prerequisites
Before starting, ensure you have:
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** v9 or higher (comes with Node.js)
- **MySQL Database** (local or cloud instance)
- **Google Gemini API Key** ([Get here](https://ai.google.dev/))

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd eco-visualizer2
```

### Step 2: Install Root Dependencies
```bash
npm install
```

This installs the `concurrently` package that allows running both frontend and backend simultaneously.

---

## ⚙️ Environment Configuration

### Backend Environment Variables
Create a `.env` file in `ecovision/backend/` directory:

```env
# Server Configuration
PORT=5000

# Database Configuration (MySQL)
DATABASE_URL="mysql://username:password@localhost:3306/ecovision"

# Google Gemini API Configuration
GEMINI_API_KEY="your_actual_google_gemini_api_key_here"
```

**Note on DATABASE_URL:**
- For local MySQL: `mysql://root:password@localhost:3306/ecovision`
- For MySQL with user: `mysql://user:password@localhost:3306/ecovision`
- For Docker MySQL: `mysql://mysql:password@mysql:3306/ecovision`

### Frontend Environment Variables
Create a `.env.local` file in `ecovision/frontend/` directory (optional):

```env
# Backend API URL (defaults to http://localhost:5000)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Database Setup
Before running the backend, create the database:
```sql
CREATE DATABASE ecovision;
```

---

## 🏃 Running the Application

### Option 1: Run Both Frontend & Backend Together (Recommended for Development)

From the root `eco-visualizer2` directory:

```bash
npm run dev
```

This command:
- Starts the Next.js frontend on `http://localhost:3000`
- Starts the Express backend on `http://localhost:5000`
- Both run in the same terminal (managed by concurrently)

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd ecovision/backend
npm install
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run database migrations
npm run prisma:seed       # Seed initial data
npm run dev               # Start Express server
```

**Terminal 2 - Frontend:**
```bash
cd ecovision/frontend
npm install
npm run dev               # Start Next.js development server
```

### Database Initialization Steps

```bash
cd ecovision/backend

# 1. Generate Prisma Client
npm run prisma:generate

# 2. Run Migrations (creates tables)
npm run prisma:migrate

# 3. Seed Initial Data (regions, predictions, solutions)
npm run prisma:seed
```

After seeding, your database will include:
- 6 pre-configured regions (Amazon Basin, Congo Basin, Borneo, Himalayas, Alps, Andes)
- Historical data for each region
- Environmental solutions categorized by type
- Region-solution mappings with priorities

---

## 📦 Building for Production

### Frontend Build
```bash
cd ecovision/frontend

# Create optimized production bundle
npm run build

# Start production server
npm run start
```

**Build Output:**
- `.next/` directory contains optimized Next.js build
- Pages are pre-rendered and optimized for performance
- JavaScript is minified and code-split

### Backend Build
```bash
cd ecovision/backend

# Compile TypeScript to JavaScript
npm run build

# Start production server
npm start
```

**Build Output:**
- `dist/` directory contains compiled JavaScript
- TypeScript type information is compiled away
- Ready for deployment

---

## 🌐 Deployment Guide

### Option 1: Deploy to Vercel (Recommended for Frontend)

#### Frontend Deployment (Next.js on Vercel)
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com/)
3. Configure environment variables:
   - Set `NEXT_PUBLIC_API_URL` to your backend URL
4. Deploy (automatic on push to main branch)

#### Backend Deployment (Express)
Consider deploying to:
- **Render** - Free tier available
- **Heroku** - Paid but reliable
- **Railway** - Good free tier
- **EC2/VPS** - Full control

### Option 2: Docker Deployment

#### Create Dockerfile for Backend
```dockerfile
FROM node:18

WORKDIR /app

COPY backend/package*.json ./
RUN npm install
RUN npm run prisma:generate

COPY backend .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

#### Create docker-compose.yml
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: ecovision
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    depends_on:
      - mysql
    environment:
      DATABASE_URL: mysql://root:root@mysql:3306/ecovision
      GEMINI_API_KEY: ${GEMINI_API_KEY}
      PORT: 5000
    ports:
      - "5000:5000"

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: http://backend:5000
    ports:
      - "3000:3000"
```

Run with: `docker-compose up`

### Option 3: Manual Server Deployment (VPS)

#### SSH into Server
```bash
ssh user@your-server-ip
```

#### Clone and Setup
```bash
git clone <repository-url>
cd eco-visualizer2

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Setup backend
cd ecovision/backend
npm install
npm run build
npm run prisma:migrate
npm run prisma:seed

# Start backend with PM2
pm2 start dist/index.js --name "ecovision-backend"

# Setup frontend
cd ../frontend
npm install
npm run build

# Start frontend
pm2 start "npm start" --name "ecovision-frontend"

# Save PM2 process list
pm2 save
```

#### Setup Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. **Database Connection Error**
```
Error: Can't reach database server at `localhost:3306`
```

**Solutions:**
- Ensure MySQL is running: `sudo service mysql status`
- Check DATABASE_URL in `.env` file
- Verify MySQL credentials are correct
- If using Docker: ensure container is running

#### 2. **Gemini API Key Errors**
```
Error: Invalid API key provided
```

**Solutions:**
- Verify API key is correctly set in `.env`
- Check for extra spaces or quotes
- Ensure key is from [ai.google.dev](https://ai.google.dev/)
- If missing, backend provides mock responses

#### 3. **CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
- Ensure backend CORS is configured for `http://localhost:3000`
- Check that API_URL in frontend matches backend address
- Restart backend server

#### 4. **Port Already in Use**
```
Error: listen EADDRINUSE :::5000
```

**Solutions:**
```bash
# Kill process using port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env to 5001, 5002, etc.
PORT=5001
```

#### 5. **Prisma Migration Issues**
```
Error: Migration lock detected
```

**Solutions:**
```bash
# Reset database (removes all data)
npm run prisma:migrate reset

# Or manually delete migration lock
rm prisma/migration_lock.toml
npm run prisma:migrate deploy
```

#### 6. **TypeScript Compilation Errors**
```
error TS2307: Cannot find module
```

**Solutions:**
- Reinstall dependencies: `npm install`
- Regenerate Prisma client: `npm run prisma:generate`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

#### 7. **Frontend Not Connecting to Backend**
- Check `NEXT_PUBLIC_API_URL` environment variable
- Ensure backend is running on the correct port
- Verify CORS settings in backend `index.ts`
- Open browser DevTools → Network tab to see API calls

---

## 📊 Data Flow Architecture

```
User Browser
    ↓
Next.js Frontend (Port 3000)
    ↓ (Axios HTTP requests)
Express Backend (Port 5000)
    ↓
    ├─→ Controllers
    │   ├─→ Regions Controller
    │   ├─→ Predictions Controller
    │   ├─→ Solutions Controller
    │   └─→ Chat Controller (Gemini AI)
    ↓
Database Layer
    ├─→ Prisma ORM
    └─→ MySQL Database
```

---

## 🔐 Security Considerations

1. **API Keys:**
   - Never commit `.env` files to git
   - Use environment variables for sensitive data
   - Rotate API keys regularly

2. **Database:**
   - Use strong passwords for MySQL
   - Enable SSL/TLS connections
   - Implement connection pooling

3. **CORS:**
   - In production, configure CORS for your actual domain
   - Restrict API access to known origins

4. **Rate Limiting:**
   - Implement rate limiting on API endpoints
   - Monitor Gemini API quota usage

---

## 📝 Additional Commands

### Package.json Scripts

**Root Level:**
```bash
npm run dev              # Run both frontend and backend
npm run dev:frontend    # Run frontend only
npm run dev:backend     # Run backend only
npm run install:all     # Install dependencies for all packages
```

**Backend:**
```bash
npm run dev              # Start development server
npm run build            # Compile TypeScript
npm start               # Run compiled JavaScript
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run database migrations
npm run prisma:seed     # Seed initial data
```

**Frontend:**
```bash
npm run dev             # Start Next.js dev server
npm run build           # Build for production
npm start              # Run production build
npm run lint           # Run ESLint
```

---

## 🤝 Contributing

To contribute to EcoVision:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit with clear messages: `git commit -m "Add feature description"`
5. Push to branch: `git push origin feature/your-feature`
6. Create a Pull Request

---

## 📄 License

[Add your license information here]

---

## 📧 Support

For issues or questions:
- Create an issue on GitHub
- Check existing issues for solutions
- Review the Troubleshooting section above

---

## 🎯 Project Roadmap

- [ ] Real-time data updates with WebSockets
- [ ] Export reports as PDF
- [ ] Mobile app using React Native
- [ ] Advanced data filtering and analysis
- [ ] User authentication and personalization
- [ ] Integration with more AI models
- [ ] Performance optimizations

---

**Last Updated:** 2024
**Version:** 1.0.0