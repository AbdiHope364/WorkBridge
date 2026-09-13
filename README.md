# WorkBridge — Digital Labor & Skill Marketplace

> **A modern, multi-tenant digital labor marketplace and trade skills platform designed for Ethiopia.**  
> Built with Next.js 16, React 19, TypeScript, Tailwind CSS, Express.js, MongoDB Atlas, and Turborepo.

---

## 📁 Monorepo Folder Structure

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

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18+` or `v22+`
- **pnpm**: `v9+` or `v10+` (`corepack enable` or `npm install -g pnpm`)

### 2. Installation
Install all monorepo dependencies:
```bash
pnpm install
```

### 3. Running Development Servers
Start all applications concurrently via Turborepo:
```bash
pnpm dev
```

Or start specific applications:
```bash
# Start Next.js Client Portal (Port 3000)
pnpm --filter web dev

# Start Next.js Admin Portal (Port 3001)
pnpm --filter admin dev

# Start Express.js REST API Backend (Port 4000)
pnpm --filter api dev
```

### 4. Code Quality & Type Verification
```bash
# Run strict TypeScript type checking across all 5 packages
pnpm check-types

# Run ESLint validation
pnpm lint

# Build production bundles
pnpm build
```

---

## 💼 Core Features & Freemium Subscriptions

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

---

## 🎓 Academic Deliverables (Dire Dawa University IoT)

- **Internship Report (Printable HTML & Markdown)**: [`docs/internship-report/`](./docs/internship-report/)
- **Part 1 Defense Presentation (16:9 Interactive Deck)**: [`docs/presentations/INTERNSHIP_PRESENTATION_SLIDES.html`](./docs/presentations/INTERNSHIP_PRESENTATION_SLIDES.html)
- **Part 2 Implementation Presentation (16:9 Interactive Deck)**: [`docs/presentations/PART_TWO_IMPLEMENTATION_PRESENTATION.html`](./docs/presentations/PART_TWO_IMPLEMENTATION_PRESENTATION.html)

---

**Author**: Abdi Abiot (`DDU1500744`) — Department of Software Engineering, Dire Dawa University IoT  
**Host Organization**: SORARDI PLC
