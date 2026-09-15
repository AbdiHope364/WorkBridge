# DIRE DAWA UNIVERSITY
## DIRE DAWA INSTITUTE OF TECHNOLOGY (DDU-IoT)
### DEPARTMENT OF SOFTWARE ENGINEERING

---

# 16-WEEK INDUSTRIAL INTERNSHIP MASTER LOGBOOK

- **Student Name:** Abdi Abiot (Student ID: DDU1500744)
- **Host Organization:** SORARDI PLC
- **Industry Supervisors:** Mr. Busha Dinsa / Mr. Dawit Tesfaye (Lead Software Architect)
- **Academic Advisor:** Mr. Fikadu (Lecturer, Department of Software Engineering, DDU-IoT)
- **Internship Period:** March 15, 2026 – July 15, 2026 (16 Weeks / 4 Months)
- **Main Project:** WorkBridge — Skilled Labor Marketplace Platform

---

## WEEK 1: Orientation, Tooling, Agile Workflow Setup & Workspace Initial Audit
- **Date Range:** March 16 – March 20, 2026 (Month 1)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Company onboarding at SORARDI PLC, team introduction, and development environment setup. | **Present** |
| **Tuesday** | Node.js v22, pnpm, Git, VS Code, and MongoDB Compass tooling installation and configuration. | **Present** |
| **Wednesday** | Analysis of WorkBridge marketplace requirements and existing informal Ethiopian labor market friction. | **Present** |
| **Thursday** | Sprint 1 planning with Lead Software Architect Mr. Dawit Tesfaye; task breakdown and story points. | **Present** |
| **Friday** | Initial codebase audit, Git repository initialization, and Weekly Sprint Review 1. | **Present** |

- **Competencies & Skills Utilized:** Agile Scrum, Git workflow, requirements analysis, toolchain configuration.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 2: Turborepo Monorepo Architecture & Shared Packages (@repo/types, @repo/ui)
- **Date Range:** March 23 – March 27, 2026 (Month 1)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Scaffolding Turborepo monorepo with pnpm workspaces for apps/client, apps/admin, and apps/api. | **Present** |
| **Tuesday** | Designing centralized Data Transfer Objects (DTOs) and TypeScript interfaces in packages/types. | **Present** |
| **Wednesday** | Implementing User, WorkerProfile, Job, and Booking schema interfaces with 100% strict typing. | **Present** |
| **Thursday** | Building reusable design system components in packages/ui (Button, Card, Input, Modal, Badge). | **Present** |
| **Friday** | Tailwind CSS configuration, cross-package linking verification, and Sprint Retrospective 2. | **Present** |

- **Competencies & Skills Utilized:** Monorepo architecture, Turborepo, pnpm workspaces, TypeScript DTOs, Tailwind design systems.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 3: Express.js REST API Scaffolding, MongoDB Atlas Cluster & Bcrypt Hashing
- **Date Range:** March 30 – April 03, 2026 (Month 1)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Structuring Express.js backend (ESM) in apps/api with modular routes, controllers, and middleware. | **Present** |
| **Tuesday** | Configuring MongoDB Atlas cloud replica set connection, retry options, and diagnostic logging. | **Present** |
| **Wednesday** | Implementing user registration endpoint with Bcrypt password hashing (10 salt rounds). | **Present** |
| **Thursday** | Implementing login endpoint with credential validation and sanitization of sensitive data. | **Present** |
| **Friday** | Database collection seed scripts and automated testing for authentication endpoints. | **Present** |

- **Competencies & Skills Utilized:** Express.js REST API, MongoDB Atlas, Mongoose ODM, Bcrypt password hashing, seed data.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 4: Stateless JWT Issuance, Google OAuth 2.0 Integration & Role-Based Access Control
- **Date Range:** April 06 – April 10, 2026 (Month 1)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Implementing stateless JWT token generation (HMAC-SHA256) and Bearer token verification middleware. | **Present** |
| **Tuesday** | Architecting Role-Based Access Control (RBAC) middleware for jobseeker, employer, and admin roles. | **Present** |
| **Wednesday** | Integrating Google OAuth 2.0 authentication with in-memory state store for user role preservation. | **Present** |
| **Thursday** | Developing password recovery endpoints (forgot-password and time-limited reset-password tokens). | **Present** |
| **Friday** | Security review with industry supervisor, Month 1 milestone sign-off, and Sprint 2 demo. | **Present** |

- **Competencies & Skills Utilized:** JWT tokens, Google OAuth 2.0, RBAC authorization, password reset cryptography, API security.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 5: Skilled Worker Discovery, Trade Category Grid & Search Optimization
- **Date Range:** April 15 – April 17, 2026 (Month 2)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Building Next.js 16 App Router worker discovery interface (apps/client/app/browse-workers). | **Present** |
| **Tuesday** | Implementing multi-category trade filters (Electricians, Plumbers, Masons, Carpenters, Painters). | **Present** |
| **Wednesday** | Developing location-based filtering (Addis Ababa, Dire Dawa, Hawassa) and hourly rate filters. | **Present** |
| **Thursday** | Optimizing MongoDB query filters with regex search indexing and pagination support. | **Present** |
| **Friday** | Frontend state synchronization and weekly standup review. | **Present** |

- **Competencies & Skills Utilized:** Next.js 16 App Router, React Server Components, MongoDB indexing, complex UI filtering.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 6: Worker Profile Showcase, Skills/Bio Dynamic Forms & Client Dashboard
- **Date Range:** April 20 – April 24, 2026 (Month 2)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Designing comprehensive tradesman profile view showcasing trade skills, hourly rate, and badges. | **Present** |
| **Tuesday** | Implementing dynamic profile editing forms with instant image preview and skill tag additions. | **Present** |
| **Wednesday** | Developing client overview dashboard (apps/client/app/dashboard/employer) with metric cards. | **Present** |
| **Thursday** | Building jobseeker overview dashboard (apps/client/app/dashboard/jobseeker) with application stats. | **Present** |
| **Friday** | Code review with senior frontend developer and peer testing across desktop/mobile viewports. | **Present** |

- **Competencies & Skills Utilized:** Dynamic form handling, client dashboard design, profile data modeling, responsive UX.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 7: Job Board Posting Wizard, Multi-Category Filtering & Candidate Application Flow
- **Date Range:** April 27 – May 01, 2026 (Month 2)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Creating structured job posting wizard in client dashboard (title, budget, category, requirements). | **Present** |
| **Tuesday** | Building public job board (apps/client/app/jobs) with category pills and search inputs. | **Present** |
| **Wednesday** | Implementing worker job application flow with modal confirmation and resume/bio snapshotting. | **Present** |
| **Thursday** | Developing client applicant review desk with shortlist, accept, and decline action buttons. | **Present** |
| **Friday** | Sprint 5 review, database seeding for sample job postings across Ethiopian cities, and retrospective. | **Present** |

- **Competencies & Skills Utilized:** Job board architecture, applicant tracking workflows, database relational references.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 8: Direct Service Booking Subsystem, 6-Stage Lifecycle & Notification Triggers
- **Date Range:** May 04 – May 08, 2026 (Month 2)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Engineering direct service booking modal allowing clients to hire tradesmen on demand. | **Present** |
| **Tuesday** | Implementing backend booking controller with fields: address, urgency, scheduledDate, offeredPrice. | **Present** |
| **Wednesday** | Implementing 6-stage booking lifecycle: PENDING → ACCEPTED / DECLINED → IN_PROGRESS → COMPLETED. | **Present** |
| **Thursday** | Developing automated in-app notification triggers on booking state changes in collections.notifications. | **Present** |
| **Friday** | Month 2 milestone presentation to SORARDI PLC engineering department and supervisor sign-off. | **Present** |

- **Competencies & Skills Utilized:** State machine design, direct booking workflows, event-driven notification pipelines.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 9: Freemium Quota Middleware (5-App Worker / 3-Job Client) & 403 Error Handling
- **Date Range:** May 18 – May 22, 2026 (Month 3)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Analyzing two-sided marketplace business models and defining freemium quota rules. | **Present** |
| **Tuesday** | Implementing server-side quota enforcement in jobController.js for client job postings (Limit: 3). | **Present** |
| **Wednesday** | Implementing worker application quota checks (Limit: 5 free applications per month). | **Present** |
| **Thursday** | Developing structured 403 QUOTA_EXCEEDED error payloads with current usage and upgrade prompts. | **Present** |
| **Friday** | Connecting frontend quota warning banners and upgrade triggers on /pricing page. | **Present** |

- **Competencies & Skills Utilized:** Marketplace economics, backend middleware, quota enforcement, error handling design.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 10: Simulated Multi-Channel Payments (Telebirr USSD, CBE Birr Wallet, Chapa Checkout)
- **Date Range:** May 25 – May 29, 2026 (Month 3)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Designing interactive MockCheckoutModal component supporting Ethiopian payment channels. | **Present** |
| **Tuesday** | Implementing simulated Telebirr USSD push flow with mobile number input and PIN mock prompt. | **Present** |
| **Wednesday** | Implementing simulated CBE Birr wallet authorization and bank transfer slip verification flow. | **Present** |
| **Thursday** | Developing Chapa hosted checkout URL simulator with redirection and mock callback verification. | **Present** |
| **Friday** | Recording simulated transactions in collections.payments with timestamp, method, and status. | **Present** |

- **Competencies & Skills Utilized:** Fintech simulation, modal state machines, payment gateway architecture, transaction logging.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 11: Instant Pro Subscription Activation, Quota Reset Engine & Bidirectional Reviews
- **Date Range:** June 01 – June 05, 2026 (Month 3)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Developing subscription activation logic in subscriptionController.js updating user tiers to Pro. | **Present** |
| **Tuesday** | Implementing automated quota resets upon active Pro subscription detection. | **Present** |
| **Wednesday** | Building bidirectional 1–5 star rating and written review submission upon service completion. | **Present** |
| **Thursday** | Calculating aggregate worker rating metrics and verified review display on public profiles. | **Present** |
| **Friday** | Sprint 7 review and full-flow validation of booking completion followed by client review. | **Present** |

- **Competencies & Skills Utilized:** Subscription management, rating calculations, review integrity, aggregate MongoDB queries.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 12: In-App Messaging Architecture, REST Conversation Endpoints & Socket.io Client Setup
- **Date Range:** June 08 – June 12, 2026 (Month 3)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Designing conversational messaging data model in collections.messages with participant arrays. | **Present** |
| **Tuesday** | Implementing REST API endpoints (/api/chat/conversations and /api/chat/conversations/:id/messages). | **Present** |
| **Wednesday** | Developing ChatService client architecture supporting Socket.io real-time events with REST fallback. | **Present** |
| **Thursday** | Building responsive chat sidebar and message bubble window UI (apps/client/app/dashboard/chat). | **Present** |
| **Friday** | Month 3 milestone review with industry supervisor and performance benchmarking. | **Present** |

- **Competencies & Skills Utilized:** Real-time communication design, REST messaging, Socket.io client setup, optimistic UI updates.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 13: Admin Moderation Portal (Port 3001), User Management & National ID Verification
- **Date Range:** June 15 – June 19, 2026 (Month 4)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Scaffolding dedicated Admin Portal in apps/admin using Next.js 16 with separate port 3001. | **Present** |
| **Tuesday** | Building administrative user management table with search, role filters, and account suspension. | **Present** |
| **Wednesday** | Implementing worker identity verification queue for reviewing national ID and trade certificates. | **Present** |
| **Thursday** | Developing job post moderation desk allowing admins to approve, flag, or remove fraudulent listings. | **Present** |
| **Friday** | Testing role-based admin route guards and dashboard KPI metric cards. | **Present** |

- **Competencies & Skills Utilized:** Administrative software engineering, KYC verification queues, moderation workflows.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 14: Subscription/Revenue Tracking, Dispute Handling & Supporting Projects
- **Date Range:** June 22 – June 26, 2026 (Month 4)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Developing admin subscription tracking dashboard monitoring mock revenue and plan distribution. | **Present** |
| **Tuesday** | Implementing dispute resolution desk for mediating client-worker booking disagreements. | **Present** |
| **Wednesday** | Contributing to supporting project LuckyEthio: building responsive UI lottery item cards. | **Present** |
| **Thursday** | Contributing to supporting project Restaurant QR Menu: touch-optimized category menu components. | **Present** |
| **Friday** | Contributing to supporting project AxumMarket: optimizing multi-vendor product filter aggregations. | **Present** |

- **Competencies & Skills Utilized:** Analytics dashboards, dispute management, multi-project full-stack contributions.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 15: Monorepo Static Type Checking (pnpm check-types) & ESLint Zero-Warning Gate
- **Date Range:** June 29 – July 03, 2026 (Month 4)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Executing full monorepo type checking with tsc --noEmit; identifying and fixing typing discrepancies. | **Present** |
| **Tuesday** | Configuring ESLint 9 Flat Configs across all packages to eliminate unused variables and any types. | **Present** |
| **Wednesday** | Achieving 100% green pass on pnpm check-types (5/5 packages green) and pnpm lint (6/6 packages green). | **Present** |
| **Thursday** | Optimizing Next.js 16 production build bundles (pnpm build) and verifying server-side rendering. | **Present** |
| **Friday** | Sprint 8 retrospective, automated test suite verification, and code freeze. | **Present** |

- **Competencies & Skills Utilized:** TypeScript static analysis, ESLint flat config, build optimization, production readiness.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

## WEEK 16: Postman API Documentation, Single Repo Consolidation & Final Handover to SORARDI PLC
- **Date Range:** July 06 – July 10, 2026 (Month 4)
- **Working Status:** Completed (Present all 5 days)

| Day | Engineering Activities & Tasks Accomplished | Attendance Status |
| :--- | :--- | :---: |
| **Monday** | Exporting Postman REST API collections and documenting all 14 endpoints with request/response schemas. | **Present** |
| **Tuesday** | Consolidating client, admin, and backend codebases into a clean single Git repository. | **Present** |
| **Wednesday** | Removing deprecated dump files and drafting root documentation (README.md, setup guides). | **Present** |
| **Thursday** | Formal software demonstration and deliverables handover to Lead Software Architect Mr. Dawit Tesfaye. | **Present** |
| **Friday** | Supervisor evaluation, attendance sheet signing with SORARDI PLC stamp, and internship completion. | **Present** |

- **Competencies & Skills Utilized:** API documentation, Postman collections, software handover, technical communication.
- **Supervisor Verification:** Mr. Busha Dinsa / Mr. Dawit Tesfaye *(Signed & Stamped — SORARDI PLC)*

---

