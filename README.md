# 🌍 Country Explorer App

A full-stack application to explore country information with filtering and search capabilities. Users can filter by region, timezone, and search by country name or capital. Built with React, TypeScript, Express, and Node.js.

---

## 📁 Project Structure

```bash
country-explorer/
├── backend/                    # Backend (Node.js + Express + TypeScript)
│   ├── controllers/            # Logic to handle requests
│   │   └── countryController.ts
│   ├── services/               # Services for external API/data handling
│   │   └── countryService.ts
│   ├── routes/                 # API route definitions
│   │   └── countryRoutes.ts
│   ├── types/                  # TypeScript interfaces and types
│   │   └── country.ts
│   ├── utils/                  # Utility functions (e.g., error handling)
│   ├── app.ts                  # Express app config
│   └── server.ts               # Entry point of backend
│
├── frontend/                   # Frontend (React + TypeScript + MUI)
│   ├── components/             # Reusable UI components
│   │   └── CountryCard.tsx
│   ├── pages/                  # Main page with filtering and scroll logic
│   │   └── CountryList.tsx
│   ├── services/               # Axios-based API calls
│   │   └── api.ts
│   ├── types/                  # TypeScript interfaces
│   │   └── country.ts
│   ├── App.tsx                 # App routes and layout
│   └── main.tsx                # React entry point
│
└── README.md                   # Project documentation

```


## 🚀 Features

### (Frontend + Backend)

This app provides an interactive interface to explore countries around the world using React, TypeScript, Material UI, and Node.js with Express.

---

### 🔎 Search & Filter
- **Search by Name or Capital:** Real-time filtering as you type.
- **Region Filter:** Filter countries by continent (e.g., Asia, Europe, Americas, etc.).
- **Timezone Filter:** Filter countries based on their timezones.
- **Sticky Filters:** Filters stay fixed on top during scrolling for quick access.

---

### 📦 Lazy Loading & Infinite Scroll
- **Initial Batch:** Loads 50 countries on first load.
- **Infinite Scrolling:** Automatically loads more countries as the user scrolls to the bottom.
- **Smooth Loading Experience:** Shows “Loading…” indicator during data fetch.

---

### 📄 Country Details Page
- **Detailed Info View:** Clicking a country card navigates to a detail page.
- Displays:
  - Flag (in circular thumbnail)
  - Country name
  - Capital
  - Region
  - Currency (symbol + name)
  - Population
  - Timezones

---

### ⚙️ Backend API
- **Built with Express + TypeScript**
- **Two Main Routes:**
  - `/api/countries` – Fetch all countries.
  - `/api/countries/:code` – Fetch detailed data of a specific country.
- **Data Source:** REST Countries API (v3)
- **Data Caching and Error handling

---

### 💅 UI & UX
- **Material UI Components:** Responsive and clean design.
- **Mobile-Friendly:** Works well on smaller screens.
- **Error Handling:** Displays user-friendly messages when API fails.

---

### 🧪 Typesafe Development
- **TypeScript everywhere:** Ensures reliable data structures on both client and server side.
- **Reusable Interfaces:** Shared types across components and services.

---

Let me know if you'd like a GIF demo or badge section to go with this!


### ✅ Frontend (React + TypeScript)

- 🔍 Search countries by **name** or **capital**
- 🌎 Filter countries by **region** (Asia, Europe, etc.)
- 🕒 Filter countries by **timezone**
- ♾️ **Infinite scroll** with batch loading (50 at a time)
- 🧊 Clean and responsive UI using **Material-UI (MUI)**
- 💡 Lazy loading using `React.lazy` and `Suspense`
- 🧱 Modular and reusable components

### 🔧 Backend (Node.js + Express)

- 🌍 `GET /countries` endpoint to fetch all countries
- 🧪 Type-safe implementation using TypeScript
- 🧱 Modular architecture with service/controller layers
- ⚙️ Robust error handling

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Material-UI (MUI)
- Axios

### Backend
- Node.js
- Express
- TypeScript
- REST Countries API

---

## 🧑‍💻 Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- npm or yarn

---

### 🔧 Backend Setup

```bash
cd backend
npm install
npm run dev