# SLN Groups — Luxury Real Estate & Infrastructure Corporate Platform

Official enterprise web platform and REST API for **SLN Groups**, South India's premier luxury real estate, bespoke gated villa estates, and landmark commercial infrastructure developer.

---

## 🏛️ Architecture Overview

The repository is organized as a decoupled full-stack architecture:

```
SLN_Groups/
├── backend/                  # NestJS 10 REST API
│   ├── src/                  # Controllers, Services, DTOs, Guards
│   │   ├── auth/             # JWT Authentication & Admin Management
│   │   ├── projects/         # Luxury Residential, Villa & Commercial Listings
│   │   ├── inquiries/        # Customer Consultation & Lead Pipeline
│   │   ├── branches/         # Corporate HQ & Regional Experience Centers
│   │   ├── team/             # Executive Board & Leadership Profiles
│   │   ├── media/            # Architectural Albums & Construction Milestones
│   │   ├── content/          # Dynamic Site CMS & Philosophy
│   │   └── storage/          # Dual Storage (Cloudflare R2 + Local Fallback)
│   ├── prisma/               # Database Schema (SQLite / PostgreSQL) & Seed Data
│   └── .env                  # Environment Configuration
│
└── frontend/                 # Next.js 14 App Router Web Portal
    ├── src/
    │   ├── app/              # App Router Pages, Layout & Global Styles
    │   └── components/       # 3D Particle Canvas & Interactive 3D Tilt Cards
    └── tailwind.config.ts    # Luxury Obsidian & Champagne Gold Theme
```

---

## ✨ Features

### 🎨 Frontend Experience (Next.js 14 + Tailwind CSS)
* **Interactive 3D Particle Constellation (`ThreeBackground.tsx`)**: Custom 60 FPS WebGL/Canvas engine projecting 100+ ambient golden nodes and floating 3D wireframe polyhedra that dynamically track cursor parallax in real time.
* **Interactive 3D Tilt Cards (`TiltCard.tsx`)**: Physics-based 3D tilt effects (`rotateX`, `rotateY`) on property cards with real-time specular light glints.
* **Filterable Developments Showcase**: Real-time filtering by category (*All*, *Ongoing*, *Completed*, *Upcoming*) synchronized with the backend.
* **Architectural Blueprint & Floor Plan Modal**: Interactive modal displaying specifications, floor plans (*3 BHK Sky Residences*, *4 BHK Royal Suites*, *Penthouses*), and luxury amenities.
* **Consultation Booking Engine**: Customer consultation and site walkthrough booking with immediate confetti celebration feedback (`canvas-confetti`) and API integration.
* **Corporate Governance & Legacy**: Dedicated sections for Founder & Chairman, MD & CEO, and regional experience centers.

### ⚙️ Backend API (NestJS + Prisma ORM)
* **Zero-Config Local Database**: Pre-configured with **SQLite** for instant, local development with zero external database dependencies.
* **Production-Ready PostgreSQL Support**: Includes a ready-to-deploy schema backup for PostgreSQL cloud deployments.
* **OpenAPI / Swagger Documentation**: Full interactive API documentation and testing playground at `http://localhost:5000/api/docs`.
* **Lead Ingestion Pipeline**: Inquiries capture client contact details, preferred walkthrough schedules, budget ranges, and status tracking (*NEW*, *CONTACTED*, *IN_PROGRESS*, *RESOLVED*).
* **Dual Asset Storage**: Cloudflare R2 object storage with automatic fallback to local disk uploads (`/uploads/`).
* **JWT Authentication**: Role-based access control (`ADMIN`, `EDITOR`) with bcrypt password hashing.

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

---

### 1. Backend Setup & Run

Open a terminal in the backend directory:

```bash
cd SLN_Groups/backend

# Install dependencies
npm install

# Seed the local SQLite database (Admin, Projects, Leadership, Branches)
npm run prisma:seed

# Start the NestJS API server
npm run start:dev
```

* 🚀 **API Base URL**: [http://localhost:5000/api](http://localhost:5000/api)
* 📖 **Swagger API Docs**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
* 🔑 **Default Admin Credentials**:
  * **Email**: `admin@slngroups.com`
  * **Password**: `admin123`

---

### 2. Frontend Setup & Run

Open a second terminal in the frontend directory:

```bash
cd SLN_Groups/frontend

# Install dependencies (if not already installed)
npm install

# Start the Next.js development server
npm run dev
```

* 🌐 **Web Portal**: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Environment Configuration

The backend reads configuration from `SLN_Groups/backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=development
APP_URL=http://localhost:5000

# Database (SQLite by default for zero-config local development)
DATABASE_URL="file:./dev.db"

# JWT Authentication
JWT_SECRET="sln_groups_super_secret_jwt_key_2025_luxury_real_estate"

# Cloudflare R2 Storage (Optional - falls back to local disk if blank)
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME="sln-groups-assets"
R2_PUBLIC_URL=""
```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/projects` | Get all published projects (supports `category`, `search`, `isFeatured`) | No |
| `GET` | `/api/projects/:slug` | Get single project details by URL slug | No |
| `POST` | `/api/projects` | Create a new project development | **Yes (JWT)** |
| `PUT` | `/api/projects/:id` | Update project details or status | **Yes (JWT)** |
| `DELETE` | `/api/projects/:id` | Remove a project listing | **Yes (JWT)** |
| `POST` | `/api/inquiries` | Submit client consultation inquiry / site walkthrough request | No |
| `GET` | `/api/inquiries` | List all customer inquiries & leads | **Yes (JWT)** |
| `PUT` | `/api/inquiries/:id/status`| Update inquiry status (*NEW*, *CONTACTED*, *RESOLVED*) | **Yes (JWT)** |
| `GET` | `/api/branches` | List headquarters and regional experience centers | No |
| `GET` | `/api/team` | List corporate executive leadership profiles | No |
| `GET` | `/api/media` | Retrieve albums, construction milestone media | No |
| `POST` | `/api/storage/upload` | Upload high-res images and floor plans (R2 / Local) | **Yes (JWT)** |
| `POST` | `/api/auth/login` | Authenticate admin user and receive JWT bearer token | No |

---

## 🗄️ Database Management (Prisma)

Run these commands inside `SLN_Groups/backend`:

| Command | Purpose |
| :--- | :--- |
| `npx prisma studio` | Opens an interactive web GUI at `http://localhost:5555` to browse and edit all tables. |
| `npm run prisma:push` | Pushes schema changes directly from `schema.prisma` to the database. |
| `npm run prisma:seed` | Populates the database with demo luxury projects (*SLN Grandeur*, *SLN Eden Villas*), leadership, and offices. |

---

## 💎 Tech Stack

* **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, HTML5 WebGL/Canvas, Lucide Icons, Canvas Confetti.
* **Backend**: NestJS 10, Express, TypeScript, Prisma ORM, Passport JWT, Bcrypt, AWS SDK (S3 / Cloudflare R2), Swagger OpenAPI.
* **Database**: SQLite (Local development) / PostgreSQL (Production ready).

---

## 📄 License & Attribution

Copyright © 2026 **SLN Groups Real Estate & Infrastructure**. All rights reserved.  
RERA Approved | IGBC Platinum Sustainable Building Partner.
