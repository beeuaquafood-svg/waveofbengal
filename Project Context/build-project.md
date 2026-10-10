---
description: Build the Wave of Bengal seafood e-commerce project from scratch using Next.js, Firebase, FastAPI, and TailwindCSS
---

# Build Wave of Bengal Project

## Prerequisites
- Node.js 18+ installed
- Python 3.9+ installed
- Firebase account (console.firebase.google.com)
- Gmail account with App Password for email sending
- Heroku CLI installed (for deployment)

## Context Files
Before starting, read these project documents to understand the full scope:
1. `flow.md` — Complete user flows, page layouts, data schemas, API specs, Firestore security rules
2. `final_tech_stack.md` — Finalized tech stack, architecture diagram, dependencies, costs
3. `implementation_plan.md` — 8-phase build order with file lists and milestones
4. `design_brief.md` — Visual identity: colors, fonts, animations, component patterns, parallax specs

## Build Phases

### Phase 0: Scaffold the project
// turbo
1. Create the Next.js frontend:
```bash
npx -y create-next-app@latest wave-of-bengal --js --app --tailwind --eslint --src-dir --no-import-alias
```

// turbo
2. Install frontend dependencies:
```bash
cd wave-of-bengal && npm install firebase framer-motion axios
```

3. Create the backend directory and install Python dependencies:
```bash
mkdir backend && cd backend && python -m venv venv && venv\Scripts\activate && pip install fastapi uvicorn firebase-admin fpdf2 python-dotenv aiosmtplib
```

4. Set up the folder structure as defined in `implementation_plan.md` Phase 0

5. Configure TailwindCSS custom theme using colors/fonts from `design_brief.md`

6. Set up Firebase project:
   - Create project at console.firebase.google.com
   - Enable Firebase Auth (Email/Password + Google)
   - Create Firestore database
   - Download Admin SDK credentials for backend
   - Copy web config to frontend `.env.local`

### Phase 1: Build authentication
7. Create `src/lib/firebase.js` with Firebase initialization
8. Create `src/contexts/AuthContext.jsx` with login, register, logout, onAuthStateChanged
9. Create login page at `src/app/auth/login/page.jsx`
10. Create register page at `src/app/auth/register/page.jsx`
11. Create `backend/services/auth_service.py` for Firebase token verification
12. Verify: Can register, login (email + Google), see user name in nav, logout

### Phase 2: Build layout shell + content pages
13. Create root layout with Navbar and Footer
14. Build landing page with hero (parallax), trust badges, featured products placeholder, testimonials
15. Build Our Story page (/our-story) with timeline
16. Build Sustainability page (/sustainability)
17. Build Certifications page (/certifications)
18. Add Framer Motion parallax and scroll animations per `design_brief.md`
19. Verify: All navigation works, parallax effects smooth, content pages render

### Phase 3: Build product catalog + cart
20. Seed Firestore with 5-6 products
21. Build ProductCard, ProductGrid, FilterBar, SearchBar components
22. Build products page at `src/app/products/page.jsx`
23. Create CartContext with add/remove/update/sync functionality
24. Build cart page with CartItem and CartSummary components
25. Add toast notifications for cart actions
26. Verify: Can browse, filter, search, add to cart, adjust quantities

### Phase 4: Build checkout + order flow
27. Create ProtectedRoute component for auth-gated pages
28. Build checkout page with contact, shipping, delivery, and order review
29. Build FastAPI `POST /api/place-order` endpoint
30. Build PDF generation service (`pdf_service.py`)
31. Build email service (`email_service.py`)
32. Save orders to Firestore, clear cart, redirect to confirmation
33. Build confirmation page
34. Verify: Full purchase flow works — order placed, PDF generated, email sent, order saved

### Phase 5: Build admin dashboard
35. Create admin route protection (check `isAdmin`)
36. Build admin layout with sidebar
37. Build dashboard with stat cards (orders, users, products, revenue)
38. Build product CRUD (add/edit/delete from Firestore)
39. Build orders table view
40. Connect search analytics panel
41. Verify: Admin can manage products, view orders, see analytics

### Phase 6: Build analytics + tracking
42. Initialize Firebase Analytics
43. Add tracking events (page views, add to cart, purchase)
44. Build SQLite search tracker in backend
45. Build `POST /api/track` endpoint
46. Build custom useTracking hook for search debounce
47. Verify: Search queries logged, Firebase Analytics showing events

### Phase 7: Build user account
48. Build profile page at `/account` with edit functionality
49. Build order history at `/account/orders`
50. Add reorder button functionality
51. Verify: Users can edit profile, view past orders, reorder

### Phase 8: Polish + deploy
52. Add SEO metadata to all pages (generateMetadata)
53. Add loading skeletons and error boundaries
54. Create custom 404 page
55. Run Lighthouse audit — target score >90
56. Deploy frontend to Vercel (connect GitHub repo, set env vars)
57. Deploy backend to Heroku:
```bash
heroku create wob-api
heroku config:set GMAIL_USER=... GMAIL_PASS=...
git push heroku main
```
58. Deploy Firestore security rules
59. Update frontend API URL to Heroku production URL
60. Final end-to-end test in production
