# Calculories Monorepo

A modern **pnpm + Turborepo** monorepo containing a web frontend, backend API, and shared packages. This setup is designed for **type safety**, **fast builds**, and **scalable collaboration**.

---

## 📦 Repository Structure

```
calculories/
├── apps/
│   ├── web/          # Frontend (Next.js / React)
│   └── api/          # Backend (NestJS)
│
├── packages/
│   ├── shared-types/ # Shared TypeScript types (DTOs, interfaces)
│   └── config/       # Shared ESLint / TS / Prettier configs (future)
│
├── turbo.json        # Turborepo pipeline configuration
├── pnpm-workspace.yaml
├── package.json      # Workspace root configuration
└── README.md
```

---

## 🛠 Tech Stack

- **Package Manager**: pnpm (workspace-based)
- **Monorepo Tooling**: Turborepo
- **Frontend**: Next.js + React
- **Backend**: NestJS
- **Language**: TypeScript

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

- Node.js 20+
- pnpm v10+

```powershell
npm install -g pnpm
```

---

### 2️⃣ Install Dependencies

From the repository root:

```powershell
pnpm install
```

> pnpm will install all workspace dependencies and link local packages automatically.

---

### 3️⃣ Build Shared Packages

Shared packages **must be built first**:

```powershell
pnpm --filter @calculories/shared-types build
```

---

### 4️⃣ Run Applications

#### Web (Next.js)

```powershell
pnpm --filter @calculories/web dev
```

#### API (NestJS)

```powershell
pnpm --filter @calculories/api start:dev
```

---

## 🔗 Shared Types Usage

Shared types live in:

```
packages/shared-types
```

They are consumed using workspace dependencies:

```ts
import type { User } from "@calculories/shared-types";
```

### Why this matters

- One source of truth for DTOs
- No duplicated types between frontend and backend
- End-to-end type safety

---

## ⚡ Turborepo

Turborepo handles:

- Incremental builds
- Task caching
- Dependency-aware pipelines

Example (from `turbo.json`):

- `web` and `api` depend on `shared-types#build`
- Shared packages build once, reused everywhere

---

## 🧹 Code Style & Formatting

- **Prettier** formats all files
- **ESLint** is configured per app
- Formatting is enforced via editor + CI (recommended)

---

## 🤝 Contributing

### Workflow

1. Create a feature branch

   ```powershell
   git checkout -b feat/my-feature
   ```

2. Make changes
3. Ensure builds pass:

   ```powershell
   pnpm build
   ```

4. Commit with clear messages
5. Open a Pull Request

---
