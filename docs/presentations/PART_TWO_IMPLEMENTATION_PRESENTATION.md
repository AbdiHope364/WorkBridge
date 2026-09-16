# DIRE DAWA UNIVERSITY
## INSTITUTE OF TECHNOLOGY (DDU-IoT)
### DEPARTMENT OF SOFTWARE ENGINEERING

---

# PART TWO: SYSTEM IMPLEMENTATION DEFENSE PRESENTATION
## **WorkBridge: A Multi-Tenant Freemium Digital Labor & Skill Marketplace Platform for Ethiopia**

---

### Slide 1: Cover Page and Project Title
- **Institution:** Dire Dawa University — Institute of Technology (DDU-IoT)
- **Department:** Department of Software Engineering
- **Project Title:** WorkBridge: A Multi-Tenant Freemium Digital Labor & Skill Marketplace Platform for Ethiopia
- **Presentation Focus:** Part Two — System Implementation & Architecture Defense
- **Student Name:** Abdi Abiot (ID: DDU1500744)
- **Host Organization:** SORARDI PLC
- **Industry Supervisor:** Mr. Dawit Tesfaye (Lead Software Architect, SORARDI PLC)
- **Academic Advisor / Supervisor:** Mr. Busha Dinsa (Department of Software Engineering, DDU-IoT)
- **Internship Duration:** March 15, 2026 – July 15, 2026 (4 Months / 8 Sprints)

---

### Slide 2: Presentation Contents
1. **Introduction** (Context & Background)
2. **Problem Statement** (Market Inefficiencies in Ethiopian Skilled Labor)
3. **Project Objectives** (General & Specific Engineering Goals)
4. **Scope and Limitations** (Boundaries & Simulated Payments Note)
5. **System Specification** (Functional & Non-Functional Requirements)
6. **Project Feasibility Analysis** (Technical, Operational, Economic, Schedule)
7. **Development Methodology & Architecture** (Agile/Scrum, Turborepo Monorepo)
8. **Results and Implementation Outcomes** (Delivered Portals & Quality Gates)
9. **Conclusion and Recommendations** (Academic & Platform Roadmap)
10. **Questions & Answers (Q&A)**

---

### Slide 3: Introduction
- **Ethiopian Skilled Labor Dynamics:**
  - Rapidly expanding urban population and construction/trade sector across Addis Ababa and Dire Dawa.
  - Over 65% of blue-collar skilled labor (electrical, plumbing, masonry, carpentry) operates through informal, fragmented channels.
- **The WorkBridge Platform:**
  - An enterprise-grade, cloud-native digital marketplace connecting certified skilled workers directly with households, property managers, and hiring enterprises.
- **Core Strategic Purpose:**
  - Standardize trade skill discovery, hiring, in-app messaging, and financial accountability through a sustainable two-sided freemium monetization model.

---

### Slide 4: Problem Statement
- **Informal Commission Brokers (*Delalas*):**
  - Clients and workers rely on roadside brokers who extract high, arbitrary commission fees (20–30%) from both parties without providing any quality guarantee.
- **Identity & Verification Deficit:**
  - Hiring clients have no centralized mechanism to verify national IDs, vocational certifications (TVET), work histories, or customer satisfaction.
- **Opaque Pricing & Search Inefficiencies:**
  - Skilled tradesmen congregate at physical road junctions with zero digital visibility, while clients spend hours searching during emergency repair needs.

---

### Slide 5: Project Objectives
- **General Objective:**
  - To design, implement, test, and validate a secure, high-performance digital labor marketplace platform tailored for the Ethiopian socio-economic context.
- **Turborepo Monorepo Architecture:**
  - Architect a modular multi-package monorepo containing a Next.js 16 client marketplace, Next.js 16 admin portal, Express.js REST API, and shared TypeScript libraries (`@repo/types`, `@repo/ui`, `@repo/api-client`).
- **Freemium Monetization & Security:**
  - Implement server-side quota enforcement (5 worker applications / 3 client job posts), simulated Ethiopian mobile payments (Telebirr, CBE Birr, Chapa), stateless JWT + Google OAuth 2.0, and 100% strict type safety.

---

### Slide 6: Scope and Limitations
- **Functional Scope:**
  - Multi-role authentication (Worker/Client/Admin), worker search engine, job posting board, applicant screening, direct service bookings with 6-stage lifecycle, and admin moderation desk.
- **Simulated Payments Note:**
  - WorkBridge initially implements a simulated payment and subscription system for academic demonstration. Real payment-provider APIs (Telebirr, Chapa, CBE) are scheduled for future production deployment.
- **Geographical & Platform Boundaries:**
  - Web-first responsive application optimized for mobile browsers; initial rollout targeted for Addis Ababa and Dire Dawa; native mobile apps (Flutter) planned for Phase 2.

---

### Slide 7: System Specification
- **Functional Requirements (FR):**
  - Role-based authentication, tradesman profile management, job posting wizard, candidate screening, direct booking workflows, star rating reviews, and freemium quota checks.
- **Performance & Scalability (NFR):**
  - Sub-1.5s initial page loads powered by Next.js 16 SSR, indexed MongoDB Atlas collections for sub-100ms query responses, and Turborepo parallel build caching.
- **Security & Maintainability (NFR):**
  - Bcrypt password hashing (10 salt rounds), stateless JWT with RBAC middleware, Helmet security headers, CORS origin guards, and 100% strict TypeScript type coverage.

---

### Slide 8: Project Feasibility Analysis
- **Technical Feasibility:**
  - Engineered using mature, modern technologies (Next.js 16, TypeScript, Node.js, Express, MongoDB Atlas, Turborepo) ensuring high concurrency and cloud scalability.
- **Operational Feasibility:**
  - Intuitive, mobile-first responsive UI built with Tailwind CSS, requiring minimal digital literacy for tradesmen and homeowners across Ethiopia.
- **Economic & Schedule Feasibility:**
  - 100% open-source software stack completed on time across 8 two-week sprints over the 4-month internship period (March–July 2026) within budget.

---

### Slide 9: Development Methodology & Architecture
- **Agile Scrum Process:**
  - Executed in 8 two-week sprint cycles with daily standups, backlog grooming, sprint reviews, and strict Git flow branching (`main`, `develop`, `feature/*`).
- **Monorepo Component Decomposition:**
  - `apps/client` (Port 3000), `apps/admin` (Port 3001), `apps/api` (Port 4000), `@repo/types` (Shared DTOs), `@repo/ui` (Tailwind Design System), and `@repo/api-client` (Typed SDK).
- **9-Phase Engineering Lifecycle:**
  - Foundation → Authentication → Profiles → Marketplace → Booking → Chat → Freemium Monetization → Admin Moderation → Quality Gate Verification.

---

### Slide 10: Results and Implementation Outcomes
- **Delivered Full-Stack Applications:**
  - Fully functional Client Marketplace (Worker/Client), Admin Moderation Portal, and Express REST API backend integrated into a clean single monorepo.
- **Automated Quality Gate Verification:**
  - `pnpm check-types` passed (5/5 packages green, 0 errors), `pnpm lint` passed (6/6 packages green, 0 warnings), and Next.js production builds fully verified.
- **Organizational Deliverables for SORARDI PLC:**
  - Production-ready WorkBridge codebase, reusable `@repo/ui` component library, Postman API collections, and complete academic defense documentation.

---

### Slide 11: Conclusion and Recommendations
- **Conclusion:**
  - The 4-month internship at SORARDI PLC successfully demonstrated how modern full-stack web engineering can eliminate informal labor market friction and empower Ethiopian tradesmen.
- **Academic Recommendations for DDU-IoT:**
  - Incorporate monorepo build tools (Turborepo) and strict TypeScript type-checking gates into undergraduate software engineering laboratory courses.
- **Future Production Roadmap for WorkBridge:**
  - Integrate live Telebirr, CBE Birr, and Chapa merchant APIs, connect with Ethiopian National ID (*Fayda*) for identity checks, and develop Flutter native mobile apps.

---

### Slide 12: Questions & Discussion
- **Presenter:** Abdi Abiot (Student ID: DDU1500744)
- **Department:** Department of Software Engineering, Dire Dawa Institute of Technology (DDU-IoT)
- **Host Organization:** SORARDI PLC
- **Project Title:** WorkBridge Platform
- **Duration:** March 15, 2026 – July 15, 2026 (4 Months)
