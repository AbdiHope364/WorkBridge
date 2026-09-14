# WorkBridge Monorepo
# WorkBridge — Digital Labor & Skill Marketplace

WorkBridge is a Turborepo workspace that contains the frontend applications and shared TypeScript packages used by the WorkBridge platform.
> **A modern, multi-tenant digital labor marketplace and trade skills platform designed for Ethiopia.**  
> Built with Next.js 16, React 19, TypeScript, Tailwind CSS, Express.js, MongoDB Atlas, and Turborepo.

This guide explains how to clone the project, install dependencies, run the apps locally, and collaborate with the backend team.
---

## Prerequisites
## 📁 Monorepo Folder Structure

Install the following before working on the project:

- [Node.js](https://nodejs.org/) `18` or newer
- [pnpm](https://pnpm.io/) `10.0.0`
- [Git](https://git-scm.com/)

Check your local versions:

```sh
node --version
pnpm --version
git --version
```text
WorkBridge/
├── apps/
│   ├── client/                  # Next.js 16 Client Portal (Jobseeker & Employer Dashboards, Pricing)
│   ├── admin/                   # Next.js 16 Admin Operations & Moderation Desk
│   ├── api/                     # Express.js REST API Backend (MongoDB Atlas, OAuth, Subscriptions)
│   └── docs/                    # Internal Documentation App
├── packages/
│   ├── ui/                      # Shared Tailwind CSS UI Component Library (Button, Card, Modal, etc.)
│   ├── types/                   # Centralized TypeScript Interfaces, DTOs & Quota Types
│   ├── api-client/              # Type-Safe HTTP Client with Subscription & Payment Methods
│   ├── eslint-config/           # Unified Flat ESLint Configuration
│   └── typescript-config/       # Base tsconfig references
├── docs/
│   ├── internship-report/       # Academic Internship Report (HTML & Markdown formats)
│   │   ├── INTERNSHIP_REPORT_ABDI_ABIOT.md
│   │   └── INTERNSHIP_REPORT_ABDI_ABIOT.html
│   └── presentations/           # 16:9 Interactive Defense Presentation Slide Decks
│       ├── INTERNSHIP_PRESENTATION_SLIDES.html
│       ├── INTERNSHIP_PRESENTATION_SLIDES.md
│       ├── PART_TWO_IMPLEMENTATION_PRESENTATION.html
│       └── PART_TWO_IMPLEMENTATION_PRESENTATION.md
├── package.json                 # Monorepo Workspace Configuration
├── turbo.json                   # Turborepo Build & Cache Pipelines
└── README.md
```

If `pnpm` is not installed, enable it through Corepack:
---

```sh
corepack enable
corepack prepare pnpm@10.0.0 --activate
```
## 🚀 Getting Started

## Clone the Repository
### 1. Prerequisites
- **Node.js**: `v18+` or `v22+`
- **pnpm**: `v9+` or `v10+` (`corepack enable` or `npm install -g pnpm`)

Clone the project from the repository URL shared by the team:

```sh
git clone https://github.com/bonsii2/workbridge-monorepo
cd workbridge-monorepo
```

Install all workspace dependencies from the repository root:

```sh
### 2. Installation
Install all monorepo dependencies:
```bash
pnpm install
```

## Project Structure

```text
workbridge-monorepo/
+-- apps/
|   +-- admin/      # Admin dashboard app
|   +-- client/     # Main client-facing web app, package name: web
|   +-- docs/       # Documentation app
+-- packages/
|   +-- api-client/ # Shared frontend API client
|   +-- eslint-config/
|   +-- types/      # Shared TypeScript API/domain types
|   +-- typescript-config/
|   +-- ui/         # Shared UI components
+-- package.json
+-- pnpm-workspace.yaml
+-- turbo.json
### 3. Running Development Servers
Start all applications concurrently via Turborepo:
```bash
pnpm dev
```
## run this instruction 
# navigate to client web 
cd apps/client 

# start the web 
pnpm run dev

## Environment Setup

The frontend apps read the backend API URL from:

```sh
NEXT_PUBLIC_API_BASE_URL
```

If this variable is not set, the apps use:

```sh
http://localhost:4000/api/v1
```

For local development, create the needed `.env.local` file in each app you run:

```sh
# apps/client/.env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
```

```sh
# apps/admin/.env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
```

Update the URL if your backend runs on a different host, port, or API prefix.

## Run the Applications

Run commands from the repository root.

### Client Web App

```sh
Or start specific applications:
```bash
# Start Next.js Client Portal (Port 3000)
pnpm --filter web dev
```

Open:

```text
http://localhost:3000
```

### Admin App

```sh
# Start Next.js Admin Portal (Port 3001)
pnpm --filter admin dev
```

Open:

```text
http://localhost:3001
# Start Express.js REST API Backend (Port 4000)
pnpm --filter api dev
```

### Docs App
### 4. Code Quality & Type Verification
```bash
# Run strict TypeScript type checking across all 5 packages
pnpm check-types

```sh
pnpm --filter docs dev
```
# Run ESLint validation
pnpm lint

Open:

```text
http://localhost:3001
```

Do not run `admin` and `docs` at the same time unless one app is configured to use a different port, because both currently use port `3001`.

## Common Commands

Run all checks from the repository root:

```sh
pnpm lint
pnpm check-types
# Build production bundles
pnpm build
```

Format TypeScript, React, and Markdown files:
---

```sh
pnpm format
```
## 💼 Core Features & Freemium Subscriptions

Run a command for a single workspace:
1. **Two-Sided Freemium Model**:
   - **Workers**: 5 free applications/month -> Pro Upgrade (299 ETB / 30 days) for unlimited applications & verified trade badges.
   - **Employers**: 3 free job posts -> Pro Upgrade (599 ETB / 30 days) for unlimited job postings & candidate management.
2. **Simulated Mobile Payments**:
   - Built-in demo checkout supporting **Telebirr**, **Chapa**, and **CBE Birr** with instant subscription activation.
3. **Multi-Role Portals**:
   - **Jobseeker Dashboard**: Trade profile customization, booking tracker, earnings.
   - **Employer Dashboard**: Worker discovery engine, job creation wizards, candidate reviewer.
   - **Admin Moderation Desk**: User verification, report auditing, subscription transaction monitor.
4. **Security & Auth**:
   - Google OAuth 2.0 social login + JWT tokens + bcrypt hashing + RBAC middleware guards.

```sh
pnpm --filter web lint
pnpm --filter admin check-types
pnpm --filter @repo/api-client lint
```
---

## Backend Integration Notes
## 🎓 Academic Deliverables (Dire Dawa University IoT)

The backend team should use these folders as the main frontend contract references:
- **Internship Report (Printable HTML & Markdown)**: [`docs/internship-report/`](./docs/internship-report/)
- **Part 1 Defense Presentation (16:9 Interactive Deck)**: [`docs/presentations/INTERNSHIP_PRESENTATION_SLIDES.html`](./docs/presentations/INTERNSHIP_PRESENTATION_SLIDES.html)
- **Part 2 Implementation Presentation (16:9 Interactive Deck)**: [`docs/presentations/PART_TWO_IMPLEMENTATION_PRESENTATION.html`](./docs/presentations/PART_TWO_IMPLEMENTATION_PRESENTATION.html)

- `packages/api-client/src/modules/` contains the API endpoints currently called by the frontend.
- `packages/types/src/` contains shared request, response, and domain types.
- `apps/client/lib/env.ts` and `apps/admin/lib/env.ts` define the frontend API base URL behavior.
---

The shared API client expects backend responses to be JSON. Error responses should include a `message` field when possible:

```json
{
  "message": "Request failed"
}
```

Authentication requests are sent with JSON bodies. The API client also sends:

- `content-type: application/json`
- `credentials: include`
- `authorization: Bearer <token>` when a token provider is configured

Current API areas include:

- Auth: login, register, current user, logout, email verification
- Jobs: list jobs and get job details
- Applications: create application and list current user's applications
- Admin: users and verification requests
- Chat, notifications, and payments modules

When backend endpoints or response shapes change, update both:

1. `packages/types/src/`
2. `packages/api-client/src/modules/`

Then run:

```sh
pnpm --filter @repo/api-client check-types
pnpm check-types
```

## Recommended Backend Team Workflow

1. Pull the latest changes from the main branch.
2. Create a new branch for your backend/API contract work.
3. Update shared types in `packages/types/src/` if request or response shapes changed.
4. Update API calls in `packages/api-client/src/modules/` if routes, methods, or payloads changed.
5. Run type checks and linting.
6. Open a pull request with a clear summary of endpoint and contract changes.

Example:

```sh
git pull
git checkout -b feature/update-auth-contract
pnpm install
pnpm check-types
pnpm lint
```

## Troubleshooting

If dependencies are missing or scripts fail after pulling new changes:

```sh
pnpm install
```

If an app cannot connect to the backend:

- Confirm the backend server is running.
- Confirm `NEXT_PUBLIC_API_BASE_URL` matches the backend URL.
- Confirm the backend allows requests from the frontend app origin.
- Confirm the API prefix matches the frontend value, for example `/api/v1`.

If a port is already in use, stop the process using that port or run only one app at a time.
**Author**: Abdi Abiot (`DDU1500744`) — Department of Software Engineering, Dire Dawa University IoT  
**Host Organization**: SORARDI PLC
