# Wave of Bengal — Implementation Plan
### From Zero to Deployed Product

---

## Phase 0: Project Scaffolding
**Goal**: Get both frontend and backend running locally with all dependencies installed.

### Frontend (Next.js)
1. Create Next.js 14+ project with App Router:
   ```bash
   npx -y create-next-app@latest wave-of-bengal --js --app --tailwind --eslint --src-dir --no-import-alias
   ```
2. Install additional dependencies:
   ```bash
   npm install firebase framer-motion axios
   ```
3. Set up folder structure:
   ```
   src/
   ├── app/              ← Next.js App Router pages
   ├── components/       ← Reusable UI components
   │   ├── layout/       ← Navbar, Footer, Layout
   │   ├── ui/           ← Buttons, Cards, Inputs, Toast
   │   ├── products/     ← ProductCard, ProductGrid, Filters
   │   ├── cart/         ← CartItem, CartSummary
   │   └── admin/        ← AdminSidebar, StatCard, ProductForm
   ├── contexts/         ← React Context providers
   │   ├── AuthContext.jsx
   │   └── CartContext.jsx
   ├── lib/              ← Utility/config files
   │   ├── firebase.js   ← Firebase config + initialization
   │   └── api.js        ← FastAPI base URL + fetch helpers
   ├── hooks/            ← Custom React hooks
   │   ├── useAuth.js
   │   └── useCart.js
   └── styles/
       └── globals.css   ← TailwindCSS + design tokens
   ```
4. Configure TailwindCSS with custom theme (colors, fonts from design_brief.md)
5. Create `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### Backend (FastAPI)
1. Create backend directory and virtual environment:
   ```bash
   mkdir backend && cd backend
   python -m venv venv
   venv\Scripts\activate   # Windows
   pip install fastapi uvicorn firebase-admin fpdf2 python-dotenv aiosmtplib
   pip freeze > requirements.txt
   ```
2. Set up folder structure:
   ```
   backend/
   ├── main.py              ← FastAPI app + routes
   ├── services/
   │   ├── pdf_service.py   ← PDF generation
   │   ├── email_service.py ← Email sending
   │   └── auth_service.py  ← Firebase token verification
   ├── database/
   │   └── analytics.py     ← SQLite search tracker
   ├── firebase-credentials.json  ← Firebase Admin SDK key (NEVER commit)
   ├── .env                 ← GMAIL_USER, GMAIL_PASS
   ├── requirements.txt
   └── Procfile             ← For Heroku deployment
   ```
3. Create `.env`:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password
   ```

### Firebase Setup
1. Create Firebase project at console.firebase.google.com
2. Enable Authentication → Email/Password + Google provider
3. Create Firestore database (production mode)
4. Set up Firestore security rules (from flow.md)
5. Download Firebase Admin SDK credentials JSON for backend
6. Get Firebase web config for frontend `.env.local`

**Milestone**: `npm run dev` shows Next.js default page, `uvicorn main:app` shows FastAPI docs at `/docs`

---

## Phase 1: Authentication System
**Goal**: Users can register, login, logout. Admins are identified.

### Files to Create
| File | Purpose |
|---|---|
| `src/lib/firebase.js` | Firebase SDK initialization |
| `src/contexts/AuthContext.jsx` | Auth state provider (onAuthStateChanged) |
| `src/hooks/useAuth.js` | Custom hook to access auth context |
| `src/app/auth/login/page.jsx` | Login page (email + Google) |
| `src/app/auth/register/page.jsx` | Registration page |
| `src/components/layout/Navbar.jsx` | Nav with login/logout/user name |
| `backend/services/auth_service.py` | Verify Firebase ID tokens |

### Build Order
1. `firebase.js` — Initialize Firebase app, export `auth` and `db`
2. `AuthContext.jsx` — Listen to `onAuthStateChanged`, fetch Firestore user profile, provide `{ user, profile, isAdmin, loading, login, register, logout }`
3. Login page — Email/password form + Google sign-in button
4. Register page — Name, email, password → create Firebase Auth user → create Firestore user doc
5. Navbar — Show "Login" when logged out, user name + "Logout" when logged in
6. Auth middleware (backend) — `verify_firebase_token()` function for protected endpoints
7. Create first admin user — Manually set `role: "admin"` in Firestore console

**Milestone**: Can register, login with email, login with Google, see user name in navbar, logout

---

## Phase 2: Layout Shell + Content Pages
**Goal**: Full site navigation works. Static pages are live.

### Files to Create
| File | Purpose |
|---|---|
| `src/app/layout.jsx` | Root layout (Navbar + Footer wrapper) |
| `src/components/layout/Footer.jsx` | Site footer |
| `src/app/page.jsx` | Landing page (hero + sections) |
| `src/app/our-story/page.jsx` | Brand story timeline |
| `src/app/sustainability/page.jsx` | Sustainability practices |
| `src/app/certifications/page.jsx` | Quality certifications |
| `src/styles/globals.css` | TailwindCSS config + design tokens |

### Build Order
1. `globals.css` — Import Google Fonts, set CSS variables, add custom Tailwind utilities
2. `layout.jsx` — Root layout with `<AuthProvider>`, Navbar, `{children}`, Footer
3. `Navbar.jsx` — Logo, nav links (Home, Products, Our Story, Sustainability, Certifications, Cart), auth buttons
4. `Footer.jsx` — Links, social icons, newsletter signup
5. Landing page (`page.jsx`) — Hero with parallax, trust badges, featured products placeholder, story teaser, testimonials, sustainability banner
6. Content pages — Our Story (timeline), Sustainability (pillars + stats), Certifications (grid)
7. Add Framer Motion animations — Parallax scroll, fade-in on scroll, stagger animations

**Milestone**: All navigation works, landing page has parallax scrolling, content pages render with animations

---

## Phase 3: Product Catalog + Cart
**Goal**: Users can browse products, filter, search, and add to cart.

### Files to Create
| File | Purpose |
|---|---|
| `src/app/products/page.jsx` | Product catalog page |
| `src/components/products/ProductCard.jsx` | Individual product card |
| `src/components/products/ProductGrid.jsx` | Grid of product cards |
| `src/components/products/SearchBar.jsx` | Search with debounce + tracking |
| `src/components/products/FilterBar.jsx` | Category filter buttons |
| `src/contexts/CartContext.jsx` | Cart state provider |
| `src/hooks/useCart.js` | Custom hook for cart operations |
| `src/app/cart/page.jsx` | Cart page |
| `src/components/cart/CartItem.jsx` | Cart item with quantity controls |
| `src/components/cart/CartSummary.jsx` | Order summary sidebar |
| `src/components/ui/Toast.jsx` | Toast notification component |

### Build Order
1. Seed Firestore — Add 5-6 products to `products` collection via Firebase console
2. `ProductCard.jsx` — Image, name, price, weight, "Add to Cart" button
3. `ProductGrid.jsx` — Responsive grid (3/2/1 columns)
4. `FilterBar.jsx` — Category buttons, Firestore query with `where()`
5. `SearchBar.jsx` — Debounced input, filter products, send tracking event to FastAPI
6. Products page — Compose grid + filters + search
7. `CartContext.jsx` — Add/remove/update quantity, calculate totals, sync to Firestore if logged in
8. `CartItem.jsx` — Product image, name, price, quantity +/- buttons, remove
9. `CartSummary.jsx` — Subtotal, delivery, GST, total, "Proceed to Checkout"
10. Cart page — Compose items + summary
11. Toast component — "Added to cart ✓" notifications

**Milestone**: Can browse products, filter by category, search, add to cart, adjust quantities, see totals

---

## Phase 4: Checkout + Order Flow
**Goal**: Logged-in users can place orders. PDF receipt is emailed.

### Files to Create
| File | Purpose |
|---|---|
| `src/app/checkout/page.jsx` | Checkout form (auth required) |
| `src/app/confirmation/page.jsx` | Order confirmation |
| `src/components/ui/ProtectedRoute.jsx` | Auth gate component |
| `backend/main.py` | `POST /api/place-order` endpoint |
| `backend/services/pdf_service.py` | Generate PDF receipt |
| `backend/services/email_service.py` | Send receipt via Gmail |

### Build Order
1. `ProtectedRoute.jsx` — Redirect to `/auth/login` if not authenticated
2. Checkout page — Contact info (auto-fill from Firestore profile), shipping address (saved addresses dropdown + new), delivery options, order review
3. Backend `POST /api/place-order` — Verify Firebase token → validate data → generate PDF → send email → return success
4. `pdf_service.py` — Generate branded PDF receipt with fpdf2
5. `email_service.py` — Send email with PDF attachment via Gmail SMTP
6. Frontend order submission — Call FastAPI → save order to Firestore → clear cart → redirect to confirmation
7. Confirmation page — Show order details, "What happens next" timeline, action buttons

**Milestone**: Full purchase flow works end-to-end. Order placed → PDF generated → email sent → order saved to Firestore → confirmation shown

---

## Phase 5: Admin Dashboard
**Goal**: Admins can manage products, view orders, see search analytics.

### Files to Create
| File | Purpose |
|---|---|
| `src/app/admin/page.jsx` | Admin dashboard |
| `src/app/admin/products/page.jsx` | Product CRUD |
| `src/components/admin/AdminSidebar.jsx` | Dashboard navigation |
| `src/components/admin/StatCard.jsx` | Stat display card |
| `src/components/admin/ProductForm.jsx` | Add/edit product form |
| `src/components/admin/OrdersTable.jsx` | Recent orders table |
| `src/components/admin/AnalyticsPanel.jsx` | Search analytics display |

### Build Order
1. Admin route protection — Check `isAdmin` from AuthContext, redirect non-admins
2. Admin layout — Sidebar + main content area
3. Dashboard — Stat cards (total orders, users, products, revenue from Firestore aggregates)
4. Product management — CRUD with Firestore (add/edit/delete products, image upload)
5. Orders view — Table of recent orders from Firestore
6. Analytics panel — Fetch from FastAPI `/api/admin/search-stats`, display top searches, export CSV/Excel
7. Backend analytics endpoints — `GET /api/admin/search-stats`, `GET /api/admin/export-csv`

**Milestone**: Admin can log in, see dashboard stats, add/edit/delete products, view orders, see search analytics

---

## Phase 6: Analytics + Search Tracking
**Goal**: Search queries are tracked. Firebase Analytics is live.

### Files to Create
| File | Purpose |
|---|---|
| `src/lib/analytics.js` | Firebase Analytics initialization |
| `src/hooks/useTracking.js` | Custom hook for tracking events |
| `backend/database/analytics.py` | SQLite search tracker |
| `backend/main.py` | `POST /api/track` + admin analytics endpoints |

### Build Order
1. Initialize Firebase Analytics in `analytics.js`
2. Add `logEvent()` calls — page views, add to cart, checkout, purchase
3. Backend SQLite tracker — Create table, log search events, query stats
4. `POST /api/track` endpoint — Receive search events from frontend, store in SQLite
5. `useTracking.js` hook — Debounced search tracking, send to FastAPI
6. Connect analytics panel in admin dashboard to real data

**Milestone**: Search queries logged in SQLite. Firebase Analytics tracking page views and conversions.

---

## Phase 7: User Account
**Goal**: Users can view/edit their profile and order history.

### Files to Create
| File | Purpose |
|---|---|
| `src/app/account/page.jsx` | User profile page |
| `src/app/account/orders/page.jsx` | Order history |

### Build Order
1. Profile page — Display/edit name, phone, addresses. Save to Firestore
2. Order history — List past orders from Firestore, ordered by date
3. Reorder button — Pre-fill cart from a past order

**Milestone**: Users can update profile, view past orders, reorder

---

## Phase 8: Polish + Deploy
**Goal**: Production-ready deployment on Vercel + Heroku.

### Tasks
1. **Landing page polish** — Refine parallax effects, animation timing, responsive tweaks
2. **SEO** — Add metadata to all pages (`generateMetadata()` in Next.js), OpenGraph tags
3. **Error boundaries** — Catch React errors gracefully
4. **Loading states** — Skeleton loaders for products, orders, analytics
5. **404 page** — Custom not-found page
6. **Performance audit** — Lighthouse score >90 on all pages

### Deployment
1. **Vercel** (Frontend):
   - Connect GitHub repo → Vercel auto-deploys
   - Set environment variables in Vercel dashboard
   - Custom domain setup (if applicable)

2. **Heroku** (Backend):
   - Create `Procfile`: `web: uvicorn main:app --host 0.0.0.0 --port $PORT`
   - `heroku create wob-api`
   - Set config vars: `heroku config:set GMAIL_USER=... GMAIL_PASS=...`
   - Deploy: `git push heroku main`
   - Update frontend `NEXT_PUBLIC_API_URL` to Heroku URL

3. **Firebase**:
   - Deploy Firestore security rules: `firebase deploy --only firestore:rules`
   - Verify Auth providers are enabled in production

**Milestone**: Site live on Vercel, API live on Heroku, Firebase connected. End-to-end flow works in production.

---

## Build Priority Summary

```
Phase 0 → Scaffolding (both projects running locally)
Phase 1 → Auth (login/register works)
Phase 2 → Shell + Content (navigation + static pages)
Phase 3 → Products + Cart (core e-commerce)
Phase 4 → Checkout + Orders (money flow)
Phase 5 → Admin Dashboard (business management)
Phase 6 → Analytics (tracking + insights)
Phase 7 → User Account (profile + history)
Phase 8 → Polish + Deploy (go live)
```

> Each phase builds on the previous. Do NOT skip ahead — each phase's "Milestone" must be verified before moving to the next.
