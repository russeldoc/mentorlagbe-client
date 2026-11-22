# MentorLagbe — Client

Frontend for **MentorLagbe**, a smart tuition & mentorship platform connecting students with tutors for online or offline tuition. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- **Public site** — home, browse tuitions (search, filter, pagination), tuition details with apply modal, pricing, about / how it works
- **Auth** — sign-in and role-based sign-up (student / tutor / admin), JWT session with profile hydration
- **Student dashboard** — overview stats, my applications (cancel pending), saved tuitions
- **Tutor dashboard** — overview, post tuition (ImgBB banner + free-quota check), manage my tuitions (edit / delete / toggle), accept or reject applicants
- **Admin dashboard** — overview with revenue stats, manage user roles, moderate tuition listings, Stripe transaction history
- **Billing** — Stripe Checkout for Pro plans (Pro Student / Pro Tutor), success/cancel pages with session verification
- **UX** — dark mode, responsive collapsible sidebar, toasts, custom loading / 404 / error pages

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| UI | React 19, Tailwind CSS 3/4, [lucide-react](https://lucide.dev) icons |
| Language | TypeScript (strict) |
| HTTP | axios (Bearer JWT interceptor) |
| Notifications | react-hot-toast |
| Images | [ImgBB](https://imgbb.com) direct upload |
| Payments | Stripe Checkout (sessions created/verified by backend) |

## Prerequisites

- Node.js 18+
- A running **MentorLagbe backend** (default `http://localhost:5000/api`) — this repo is the client only

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# edit .env.local with your values

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Define in `.env.local` (see `.env.local.example`):

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL (e.g. `http://localhost:5000/api`) |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Backend origin used for auth-related URLs |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB API key for image uploads |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (test or live) |

`.env*` files are gitignored — never commit secrets.

## Project structure

```
src/
├── app/
│   ├── (public)/          # Navbar + Footer layout
│   │   ├── page.tsx       # Home (hero, featured tuitions, pricing, how it works)
│   │   ├── tuitions/      # Browse + [id] detail / apply
│   │   ├── pricing/       # Free vs Pro plans (Stripe)
│   │   └── about/
│   ├── (auth)/            # sign-in / sign-up
│   ├── payment/           # success / cancel
│   ├── dashboard/         # Sidebar layout + role-guarded routes
│   │   ├── profile/       # Shared profile update (ImgBB)
│   │   ├── student/       # overview, my-applications, saved
│   │   ├── tutor/         # overview, post-tuition, my-tuitions, applicants
│   │   └── admin/         # overview, users, tuitions, transactions
│   ├── layout.tsx         # Root layout (AuthProvider, Toaster)
│   ├── loading.tsx | not-found.tsx | error.tsx
│   └── globals.css
├── components/
│   ├── shared/            # Navbar, Footer, TuitionCard
│   └── dashboard/         # StatCard
├── lib/
│   ├── api.ts             # axios instance + JWT localStorage interceptor
│   └── imgbb.ts           # image upload helper
├── providers/
│   └── AuthProvider.tsx   # user, role, plan, dark mode, login/register/logout
└── types/
    └── index.ts           # User, Tuition, Application, Payment types
```

Home sections, dashboard sidebar, and theme toggle are implemented inline in the pages/layouts above rather than as separate files.

## Routes

| Area | Path |
| --- | --- |
| Public | `/`, `/tuitions`, `/tuitions/[id]`, `/pricing`, `/about` |
| Auth | `/sign-in`, `/sign-up` |
| Payment | `/payment/success`, `/payment/cancel` |
| Student | `/dashboard/student`, `/dashboard/student/my-applications`, `/dashboard/student/saved` |
| Tutor | `/dashboard/tutor`, `.../post-tuition`, `.../my-tuitions`, `.../applicants` |
| Admin | `/dashboard/admin`, `.../users`, `.../tuitions`, `.../transactions` |
| Shared | `/dashboard/profile` |

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Deployed

Deployed on [Vercel](https://mentorlagbe-client-kappa.vercel.app) (Next.js default). Remote image hosts allowed in `next.config.mjs`: `i.ibb.co`, `images.unsplash.com`.

## Backend API surface used by this client

- **auth-session** — `POST /auth-session/login`, `POST /auth-session/register`, `GET /auth-session/me`
- **tuitions** — list, detail, tutor CRUD, admin approve/reject, save/bookmark
- **applications** — create, list, accept/reject, cancel
- **payments** — `POST /payments/create-checkout-session`, `POST /payments/verify-session`, admin transactions
- **admin** — user role management, moderation, revenue stats

The backend owns authorization, plan limits, and Stripe secret operations; this client only presents UI and attaches the JWT from `localStorage`.
