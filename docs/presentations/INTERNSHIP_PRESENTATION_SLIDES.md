# Software Engineering Internship Defense Presentation
## WorkBridge: A Multi-Tenant Digital Labor & Skill Marketplace Platform for Ethiopia

---

### Slide 1: Title & Cover Slide
- **Institution:** Dire Dawa University — Institute of Technology (IoT)
- **Department:** Department of Software Engineering
- **Presentation Title:** Software Engineering Internship Defense
- **Project Name:** WorkBridge — Labor & Tradesman Marketplace Platform
- **Presenter:** Abdi Abiot (ID: DDU1500744)
- **Host Company:** SORARDI PLC
- **Internship Period:** May 2026 – September 2026 (4 Months)
- **Academic Advisor:** Department Internship Coordinator
- **Industry Mentor:** Lead Software Architect, SORARDI PLC

---

### Slide 2: Presentation Agenda
1. **Introduction & Objectives**
2. **Company Background (SORARDI PLC)**
3. **Problem Statement & Motivation**
4. **Proposed Solution (WorkBridge Overview)**
5. **System Architecture & Monorepo Structure**
6. **Key Features & Implementation Highlights**
7. **Technical Stack & Tools Utilized**
8. **Engineering Methodology & Team Collaboration**
9. **Challenges Encountered & Technical Solutions**
10. **Organizational Impact & Deliverables**
11. **Learning Outcomes & Career Growth**
12. **Conclusion & Recommendations**
13. **Q&A Session**

---

### Slide 3: Introduction & Internship Objectives
- **Academic Alignment:** Bridge theoretical software engineering concepts with industry-scale production software development.
- **Primary Objectives:**
  - Architect and develop a production-ready web platform for the Ethiopian labor market.
  - Master full-stack monorepo workflows using Next.js 16, TypeScript, Node.js, and MongoDB.
  - Implement modern authentication protocols (Google OAuth 2.0 / JWT) and secure role-based access control (RBAC).
  - Practice Agile/Scrum engineering workflows with continuous integration and strict static quality checks.

---

### Slide 4: Company Profile — SORARDI PLC
- **Company Profile:** Ethiopian software development firm specializing in digital platforms, fintech integrations, and enterprise SaaS solutions.
- **Core Technology Verticals:**
  - Multi-tenant marketplace platforms.
  - Localized fintech integrations (Telebirr, CBE Birr, Chapa).
  - Enterprise ERP & custom cloud architecture.
- **Organizational Alignment:** Embedded within the core **WorkBridge Product Team** under the Direct Supervision of the Lead Software Architect.

---

### Slide 5: Problem Statement & Motivation
- **Ethiopian Labor Market Inefficiencies:**
  - **Informal & Fragmented:** Skilled tradesmen (electricians, plumbers, carpenters, masons) rely on informal roadside gatherings or unverified word-of-mouth.
  - **Lack of Trust & Verification:** Clients cannot verify credentials, past customer reviews, or work quality.
  - **Income Instability:** Workers lack predictable scheduling, transparent pricing, and digital portfolios.
  - **Communication & Payment Gaps:** No centralized escrow or digital transaction tracking exists for local blue-collar services.

---

### Slide 6: Proposed Solution — WorkBridge Platform
- **A Unified Multi-Tenant Marketplace:**
  - **Direct Worker Booking:** Instant hire by skill category, location, and verified rating.
  - **Structured Job Board:** Employers post requirements; qualified workers apply in one click.
  - **Three Specialized Portals:**
    1. *Jobseeker / Worker Portal:* Profile customization, skill badges, booking management, payouts.
    2. *Employer / Client Portal:* Job creation wizards, candidate screening, applicant status tracking.
    3. *Admin Moderation Portal:* Account verification, fraud prevention, transaction audit, reports queue.

---

### Slide 7: System Architecture & Monorepo Structure
- **Turborepo Monorepo Architecture:**
  - `apps/client` (Port 3000): Next.js 16 App Router for Jobseekers & Employers.
  - `apps/admin` (Port 3001): Next.js 16 Admin Moderation & Analytics Portal.
  - `packages/ui`: Shared design system & Tailwind component library.
  - `packages/types`: Centralized TypeScript DTO interfaces & shared domain models.
  - `packages/api-client`: Type-safe HTTP client wrapper with automatic token management.
  - `workbridge-backend-main` (Port 4000): Express.js REST API connected to MongoDB Atlas.

---

### Slide 8: Core Modules & User Portals
1. **Worker Discovery Engine:** Categorized trade pills (Electrician, Plumber, Mason, Carpenter), location filters across Ethiopian cities, and rate calculators.
2. **Authentication & Social Identity:** Stateless Google OAuth 2.0 and JWT token authentication with automated role provisioning.
3. **Escrow & Payments Dashboard:** Real-time balance inspection, transaction status (`Escrow Held`, `Completed`), and localized payout integrations.
4. **Admin Moderation Desk:** Flagged report resolution, content moderation, employer verification, and system health metrics.

---

### Slide 9: Technical Stack & Tools Utilized
- **Frontend Layer:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend & Database:** Node.js, Express.js REST API, MongoDB Atlas, Mongoose ODM.
- **Authentication & Security:** Google Cloud OAuth 2.0, JWT Tokens, bcrypt, Role-Based Route Guards.
- **DevOps & Monorepo Tooling:** Turborepo, pnpm Workspaces, Git, GitHub, ESLint Flat Configs, VS Code.

---

### Slide 10: Technical Challenges & Problem Solving
1. **Challenge 1: Cross-Origin OAuth Authentication**
   - *Problem:* CORS issues and cookie isolation between Client (port 3000) and Express API (port 4000).
   - *Solution:* Implemented Next.js App Router reverse-proxy rewrites (`/api/:path*`), maintaining same-origin cookie integrity.
2. **Challenge 2: Strict Type Safety across Monorepo**
   - *Problem:* Dynamic backend payloads caused `any` lint errors and runtime undefined errors in data tables.
   - *Solution:* Engineered strict DTO models in `@repo/types`, achieving 100% type safety and zero compiler warnings.
3. **Challenge 3: Monorepo Build Optimization**
   - *Problem:* Redundant builds across multiple apps during development.
   - *Solution:* Configured Turborepo intelligent cache pipelines, reducing build times from minutes to seconds.

---

### Slide 11: Engineering Methodology & Teamwork
- **Agile Scrum Framework:**
  - 2-week sprint cycles with daily 15-minute standup meetings.
  - Sprint planning, backlog grooming, and retrospective reviews.
- **Git Flow & Quality Gates:**
  - Branching model: `main`, `develop`, `feature/*`, `fix/*`.
  - Mandatory peer reviews and passing automated CI checks (`pnpm lint`, `pnpm check-types`).

---

### Slide 12: Organizational Contributions & Impact
- **Value Delivered to SORARDI PLC:**
  - Accelerated development timeline, enabling closed beta testing with trade workers in Addis Ababa and Dire Dawa.
  - Established the company's reusable `@repo/ui` component design system.
  - Delivered 100% type-safe, production-ready codebase with comprehensive API documentation.

---

### Slide 13: Learning Outcomes & Career Growth
- **Key Competencies Acquired:**
  - Production-grade monorepo architecture and micro-frontend design.
  - Advanced Next.js App Router, SSR/CSR optimizations, and caching strategies.
  - Scalable NoSQL schema design and indexing in MongoDB Atlas.
  - Real-world Agile teamwork, code review standards, and technical communication.

---

### Slide 14: Conclusion & Recommendations
- **Summary:** The 4-month internship at SORARDI PLC successfully transformed university software engineering principles into an enterprise-grade digital labor marketplace.
- **Recommendations for University:** Incorporate modern monorepo and TypeScript workflows into practical lab coursework.
- **Future Work for WorkBridge:** Develop mobile companion applications (React Native / Flutter) and offline-first USSD/SMS booking channels.

---

### Slide 15: Q&A / Acknowledgments
## Thank You!
### Questions & Comments?

- **Presenter:** Abdi Abiot (DDU1500744)
- **Department:** Software Engineering, Dire Dawa University IoT
- **Host Company:** SORARDI PLC
