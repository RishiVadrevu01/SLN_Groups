# SLN Groups — Frontend Web Application

The official client-facing corporate web portal for **SLN Groups Real Estate & Developments**, built with Next.js 14, Tailwind CSS, Framer Motion, and HTML5 WebGL/Canvas 3D interactions.

---

## 🌟 Key Features

* **3D Particle Constellation Engine (`src/components/ThreeBackground.tsx`)**: Real-time 60 FPS interactive particle constellation with floating wireframe geometric architectural landmarks that dynamically respond to mouse parallax.
* **Interactive 3D Tilt Cards (`src/components/TiltCard.tsx`)**: Physics-based perspective tilt with dynamic specular light glare reflection that tracks cursor angle.
* **Developments Showcase**: Live filterable properties (*All*, *Ongoing*, *Completed*, *Upcoming*) synchronized with the backend REST API (`/api/projects`).
* **Floor Plan & Specification Modal**: Detailed blueprint layouts (*3 BHK Sky Residences*, *4 BHK Royal Suites*, *Penthouses*) and IGBC sustainability metrics.
* **Private Consultation Desk**: Live lead inquiry form with immediate celebration feedback (`canvas-confetti`) hooked up to the NestJS backend.
* **Luxury Obsidian & Gold Styling**: High-contrast, dark-mode-first aesthetic with glassmorphic cards and subtle specular glows.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🔗 Backend Connectivity

The frontend connects to the local NestJS backend at `http://localhost:5000`:
* Property data is loaded from `GET http://localhost:5000/api/projects`.
* Consultation requests are dispatched to `POST http://localhost:5000/api/inquiries`.
* If the backend is temporarily offline, the frontend seamlessly uses embedded luxury fallback assets so the portal remains fully interactive and visual.
