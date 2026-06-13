# � EcoVision (Eco-Visualizer)

EcoVision is a full-stack Environmental Dashboard and Prediction application. It provides users with dynamic visualizations, data-driven predictions, interactive geographical maps, and deep AI-powered insights concerning global environmental trends, specific regional impacts, and viable actionable solutions.

The project aims to visualize the tangible impacts of climate change across critical domains: **Forests**, **Glaciers**, **Water Resources**, and **Pollution**.

---

## 🤖 AI Integration & Capabilities

At the heart of EcoVision lies its AI Engine, powered by the **Google Generative AI (Gemini) SDK**. The AI is deeply integrated into the backend (`@google/generative-ai`) and exposed to the user through several key features:

1. **Intelligent Chatbot Panel:** Available globally across the app via `<ChatbotPanel />`, users can converse naturally about environmental changes, ask for region-specific advice, or request deep explanations of phenomena (e.g., "How does deforestation in the Amazon affect global temperatures?").
2. **Predictive Analysis:** The AI assists in processing historical environmental data and generating narrative predictions (`predictions.controller.ts`) about future climate scenarios.
3. **Automated Solutions:** The system generates context-aware, actionable solutions (`solutions.controller.ts`) for specific regions, converting raw data into understandable mitigation strategies.

---

## 🏗️ System Architecture & Project Structure

The repository is structured as a monorepo containing a **Frontend (Client)** and a **Backend (API)**.

```text
ecovision/
 ├── backend/               # Node.js / Express API
 │    ├── prisma/           # Database schema & seeding (schema.prisma, seed.ts)
 │    └── src/
 │         ├── controllers/ # chat, predictions, regions, solutions logic (AI & DB queries)
 │         ├── routes/      # Express API route definitions
 │         └── index.ts     # Express server entry point
 │
 └── frontend/              # Next.js Application
      ├── app/              # App Router pages (forests, glaciers, pollution, search, water, solutions)
      ├── components/       # Reusable UI (Charts, Chatbot, Maps, Layouts)
      ├── hooks/            # React Query-style data fetching hooks (useChat, usePredictions)
      └── lib/              # Core API configuration (api.ts using Axios)
```

---

## 🛠️ Technology Stack

### Frontend (User Interface)
* **Next.js 15 (App Router) & React 19:** Provides a fast, SEO-friendly, and highly interactive user interface with server-side rendering capabilities.
* **TypeScript:** Ensures strict typing and reliable data flow from the API to the UI.
* **Tailwind CSS:** For rapid, responsive, utility-first styling.
* **Data Visualization (Chart.js & React-Chartjs-2):** Used for rendering powerful predictive data visualizations (e.g., `<PredictionChart />`).
* **Interactive Mapping (Leaflet):** An open-source JavaScript library handling the global `<WorldMap />` component to visualize regional impacts interactively.
* **Mermaid:** Renders complex markdown-inspired text definitions into dynamic methodology diagrams (`<Methodology />` page).

### Backend (API Server)
* **Express.js (Node.js):** A fast, structural web framework acting as our REST API, routing requests to controllers.
* **TypeScript:** Configured with `ts-node-dev` for a completely type-safe backend developer experience.
* **Google Generative AI SDK:** Integrates Gemini directly into the server to handle AI prompts, chat history, and solution generation securely.
* **Express Async Handler:** Streamlines error handling in asynchronous route controllers.

### Database Layer
* **Database:** A robust relational database (configured via Prisma).
* **Prisma (ORM):** 
  * Prisma handles all database interactions using clean, readable TypeScript methods. It reads the `schema.prisma` file, generates strict TypeScript types, and manages migrations automatically.

---

## 🔄 Data Flow

1. **User Interaction:** A user visits a specialized dashboard (e.g., `http://localhost:3000/glaciers`) or interacts with the Chatbot.
2. **API Request:** The custom frontend hooks (e.g., `usePredictions.ts`, `useChat.ts`) send an HTTP request via Axios to the standard backend API (`http://localhost:5000/api/...`).
3. **Backend Processing:** Express routes the request to the correct controller.
4. **AI & Database Query:** The controller either fetches structured data securely via Prisma or constructs a prompt to query the Google Gemini AI model.
5. **Response & Visualization:** The JSON payload is returned to the frontend, where React state is updated, dynamically rendering geographical maps (`Leaflet`), predictive charts (`Chart.js`), or streaming AI responses directly to the user.

---

## 🚀 Getting Started

### Prerequisites 
- Node.js (v18+ recommended)
- A local SQL/Relational Database instance
- A Google Gemini API Key

### 1. Environment Configuration
Create a `.env` file in the `backend` directory:
```env
PORT=5000
DATABASE_URL="your_database_url_here"
GEMINI_API_KEY="your_google_gemini_api_key_here"
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed      # Seeds initial region and mock prediction data
npm run dev              # Starts the Express server
```

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev              # Starts the Next.js application on localhost:3000
```