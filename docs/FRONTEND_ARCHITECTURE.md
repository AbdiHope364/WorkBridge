# WorkBridge Frontend Architecture

WorkBridge should be organized around business capabilities, not file types. The apps own routing, layouts, and app-specific screens; packages own reusable contracts, UI primitives, and backend integration utilities.

## Target Monorepo Shape

```txt
apps/
  client/
    app/                    # Next.js App Router routes and route groups
    features/
      auth/                 # login, register, email verification, session UI
      jobs/                 # browse, detail, save, employer job posting
      applications/         # apply, track status, manage applications
      chat/                 # conversations, messages, realtime adapter
      notifications/        # unread count, list, preferences, toasts
      payments/             # Chapa checkout screens and payment status
    components/             # client-only shared shell components
    hooks/                  # app-level hooks that compose features/services
    lib/                    # env, api wiring, auth helpers, route utilities
    services/               # optional app-specific orchestration only
    middleware.ts           # user route protection
  admin/
    app/
    features/
      users/                # user management and suspension
      verification/         # document review and approval
      jobs/                 # job moderation and monitoring
      transactions/         # Chapa/payment monitoring
      notifications/        # admin notification surfaces
    components/             # admin shell/table/filter components
    hooks/
    lib/
    middleware.ts           # admin route protection
packages/
  ui/
    src/components/         # design-system primitives only
    src/layouts/            # reusable layout primitives, not app shells
  types/
    src/                    # shared DTOs and frontend domain contracts
  api-client/
    src/http.ts             # fetch wrapper, errors, auth transport
    src/modules/            # auth/jobs/applications/chat/etc REST clients
  eslint-config/
  typescript-config/
```

## Boundaries

`apps/client` is the public marketplace experience. It can import `@repo/ui`, `@repo/types`, and `@repo/api-client`, but it should not import admin feature code.

`apps/admin` is an operations dashboard. It reuses shared types, UI primitives, and API clients, but owns its tables, filters, monitoring pages, and admin-specific workflows.

`packages/ui` contains reusable, backend-agnostic UI primitives. Keep domain components like `JobCard`, `ApplicationTimeline`, or `VerificationQueue` inside app features unless both apps truly need the same behavior.

`packages/types` is the contract layer between frontend surfaces. These are DTOs and frontend-safe domain types, not MongoDB models.

`packages/api-client` is the REST integration layer. It knows endpoint paths and request/response types, but not React, Next.js routing, local UI state, or backend database details.

## API Pattern

Use one typed client factory and feature services:

```ts
import {
  createApiClient,
  createAuthService,
  createJobsService,
} from "@repo/api-client";

const apiClient = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
});

export const api = {
  auth: createAuthService(apiClient),
  jobs: createJobsService(apiClient),
};
```

Why: endpoint details stay in one package, both apps share the same DTOs, and switching from direct REST to Next route-handler proxying later does not rewrite feature UI.

## React Hooks

Hooks should compose API services and UI state. For server state at scale, add TanStack Query and move cache keys beside each feature.

```ts
"use client";

import { useEffect, useState } from "react";
import type { User } from "@repo/types/auth";
import { api } from "../lib/api";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.auth
      .me()
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, []);

  return { user, isLoading, isAuthenticated: Boolean(user) };
}
```

Why: React hooks remain small adapters. The transport, endpoint names, and contracts stay outside React components.

## Shared UI Usage

```tsx
import { Button } from "@repo/ui/button";

export function ApplyButton() {
  return <Button appName="client">Apply now</Button>;
}
```

Why: UI primitives enforce consistency. Feature components still decide wording, data, and workflow.

## Authentication

Recommended production flow:

1. User submits credentials from `features/auth`.
2. Backend validates credentials and issues JWT access/refresh tokens.
3. Prefer `HttpOnly`, `Secure`, `SameSite=Lax` cookies for browser sessions.
4. Frontend calls REST with `credentials: "include"`.
5. Backend remains the authority for authorization; middleware only improves routing UX.
6. Refresh tokens should rotate server-side. Do not put long-lived JWTs in localStorage.

The current app middleware checks `workbridge_session` and, for admin, `workbridge_role`. That role cookie is only a fast frontend gate; every admin API call must still be verified by the backend JWT claims.

## Role-Based Access

Client app roles:

```ts
type UserRole = "candidate" | "employer" | "admin";
```

Use role checks for rendering navigation and redirecting obvious mismatches. Use backend authorization for actual permissions.

Admin app rule: require authenticated `admin` role for every dashboard route. Keep admin routes in `apps/admin`; do not hide admin pages inside the client app.

## Scalable Modules

`auth`: forms, validation, session state, email verification, password reset.

`jobs`: search, filtering, job detail, posting, moderation views.

`applications`: submit application, update status, candidate history, employer review.

`chat`: REST message history first; later add WebSocket/SSE adapter inside `features/chat/lib` so UI components do not depend on the realtime protocol.

`notifications`: API polling or realtime subscription, unread counts, toast mapping, read state.

`payments`: Chapa checkout initiation, return/callback status screens, transaction display. Never trust frontend payment status alone.

## TypeScript

Use shared strict configs from `@repo/typescript-config`. Keep `strict`, `noUncheckedIndexedAccess`, and `isolatedModules` enabled. App tsconfigs should only add Next plugins and local path aliases.

Why: every workspace compiles under the same assumptions, which catches integration drift early.

## Tailwind

Use Tailwind v4 consistently across both Next apps. Put global tokens in each app’s `globals.css`; put reusable component styling in `packages/ui` only when the component is truly shared.

Why: apps can have different layout needs while sharing primitives and design tokens.

## Performance

Default to Server Components for read-heavy pages such as job lists and admin dashboards. Use Client Components only for forms, live chat, filters requiring immediate interactivity, and optimistic updates.

Keep pages under the 2s target with pagination, server-side filtering, route-level loading states, and cached reads where the data is not user-sensitive.
