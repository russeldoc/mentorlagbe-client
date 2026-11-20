mentorlagbe-client/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx                 # Public Navbar + Footer wrapper
│   │   │   ├── page.tsx                   # Home Page (Hero, 6 Tuitions, Pricing, How It Works, Stats)
│   │   │   ├── tuitions/
│   │   │   │   ├── page.tsx               # Browse Tuitions (Search, Filter, Pagination)
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx           # Tuition Details + Student Apply Modal
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx               # Free vs. Pro Subscription Plans
│   │   │   └── about/
│   │   │       └── page.tsx               # How It Works / About MentorLagbe
│   │   ├── (auth)/
│   │   │   ├── sign-in/page.tsx           # Login Page
│   │   │   └── sign-up/page.tsx           # Role-Based Registration Page
│   │   ├── payment/
│   │   │   ├── success/page.tsx           # Stripe Checkout Success + Session Verification
│   │   │   └── cancel/page.tsx            # Stripe Checkout Cancelled
│   │   ├── dashboard/
│   │   │   ├── layout.tsx                 # Responsive Collapsible Sidebar + Role Guard
│   │   │   ├── profile/page.tsx           # Shared Update Profile (with ImgBB Upload)
│   │   │   ├── student/
│   │   │   │   ├── page.tsx               # Student Overview Stats
│   │   │   │   ├── my-applications/page.tsx # Applied Tuitions Table + Cancel Pending
│   │   │   │   └── saved/page.tsx         # Bookmarked Tuitions (Optional)
│   │   │   ├── tutor/
│   │   │   │   ├── page.tsx               # Tutor Overview Stats
│   │   │   │   ├── post-tuition/page.tsx  # Create Tuition Form (ImgBB + Free Quota check)
│   │   │   │   ├── my-tuitions/page.tsx   # Manage Created Tuitions (Edit/Delete/Toggle)
│   │   │   │   └── applicants/page.tsx    # Accept / Reject Student Applications
│   │   │   └── admin/
│   │   │       ├── page.tsx               # Admin Overview + Stripe Revenue Stats
│   │   │       ├── users/page.tsx         # Manage User Roles
│   │   │       ├── tuitions/page.tsx      # Approve / Reject Tuition Listings
│   │   │       └── transactions/page.tsx  # Stripe Payments History
│   │   ├── layout.tsx                     # Root Layout (ThemeProvider, AuthProvider, Toaster)
│   │   ├── loading.tsx                    # Global Custom Skeleton/Spinner
│   │   ├── not-found.tsx                  # Custom 404 Page
│   │   └── error.tsx                      # Custom Error Boundary Page
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx                 # Includes new X logo
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── TuitionCard.tsx            # Equal-height uniform card component
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedTuitions.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── StatsAndTestimonials.tsx
│   │   └── dashboard/
│   │       ├── Sidebar.tsx
│   │       ├── Topbar.tsx
│   │       └── StatCard.tsx
│   ├── lib/
│   │   ├── api.ts                         # Axios/Fetch client with JWT interceptor
│   │   ├── auth-client.ts                 # BetterAuth React client
│   │   └── imgbb.ts                       # Direct image file upload helper
│   ├── providers/
│   │   └── AuthProvider.tsx               # Manages user, role, plan & JWT hydration
│   └── types/
│       └── index.ts                       # Interfaces for User, Tuition, Application, Payment
├── .env.local                             # Client environment variables (gitignored)
├── .gitignore
├── next.config.mjs                        # Configure remotePatterns for ImgBB domains
├── package.json
└── README.md