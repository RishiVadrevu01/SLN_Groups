# SLN Groups — Backend REST API

Official NestJS backend API powering the **SLN Groups Real Estate Corporate Website**.

---

## 🛠️ Tech Stack

* **Framework**: NestJS 10.3 (Express platform)
* **Language**: TypeScript 5.4
* **ORM & Database**: Prisma 5.22 + SQLite (local development) / PostgreSQL (production ready)
* **Auth**: Passport-JWT + Bcrypt (role-based: `ADMIN`, `EDITOR`)
* **Storage**: Dual-driver `StorageService` (Cloudflare R2 + Local disk uploads)
* **Documentation**: Swagger OpenAPI (`/api/docs`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (`.env`)
Make sure `.env` contains:
```env
PORT=5000
NODE_ENV=development
APP_URL=http://localhost:5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="sln_groups_super_secret_jwt_key_2025_luxury_real_estate"
```

### 3. Seed Database
Populate demo admin account, luxury projects, leadership, and branch offices:
```bash
npm run prisma:seed
```

### 4. Start Development Server
```bash
npm run start:dev
```

* **API**: [http://localhost:5000/api](http://localhost:5000/api)
* **Interactive Swagger Docs**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run start:dev` | Starts the NestJS API in watch mode |
| `npm run build` | Compiles TypeScript into `dist/` |
| `npm run prisma:push` | Syncs schema changes directly to SQLite `dev.db` |
| `npm run prisma:seed` | Populates the database with initial demo data |
| `npx prisma studio` | Opens Prisma Studio web UI at `http://localhost:5555` |

