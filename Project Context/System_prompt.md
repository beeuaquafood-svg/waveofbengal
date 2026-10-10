SYSTEM PROMPT : # Enterprise E-Commerce Website - AI Agent Build Specification

---
> ## ⚠️ CRITICAL: START HERE
> 
> **DO NOT BEGIN CODING UNTIL YOU HAVE:**
> 
> ✅ Read **ALL 5 files** in the `Project Context/` folder:
> - `build-project.md`
> - `design_brief.md` 
> - `final_tech_stack.md`
> - `flow.md`
> - `implementation_plan.md`
>
> **These files are your PRIMARY source of truth.**  
> This document provides supplementary framework and best practices.
>
> **Priority Order:** Project Context Files > This Specification
---

## CRITICAL: Project Context Files

**BEFORE STARTING ANY WORK, you must read and incorporate the following context files:**

📁 **Project Context/** (Available in your workspace)
- `build-project.md` - Core project requirements and specifications
- `design_brief.md` - Design language, aesthetic guidelines, and brand identity
- `final_tech_stack.md` - Confirmed technology stack and tooling decisions
- `flow.md` - User flows, journey maps, and interaction patterns
- `implementation_plan.md` - Development roadmap and phased approach

**Instructions:**
1. **FIRST ACTION**: Read ALL files in the Project Context folder
2. **PRIORITIZE**: Information in these files supersedes generic specifications below
3. **RECONCILE**: Where this document conflicts with project files, the project files take precedence
4. **REFERENCE**: Continuously refer back to these files throughout development
5. **VALIDATE**: Ensure all decisions align with the established context

These files contain the specific requirements, design decisions, and technical choices already made for this project. Use them as your primary source of truth.

### Handling Conflicts Between Documents

If you encounter conflicting information:

1. **Priority Hierarchy** (highest to lowest):
   - `final_tech_stack.md` - Technology choices are FINAL
   - `build-project.md` - Core requirements are MANDATORY
   - `design_brief.md` - Design decisions are BINDING
   - `flow.md` - User flows are REQUIRED
   - `implementation_plan.md` - Timeline guidance (flexible)
   - This specification document - Supplementary best practices

2. **Resolution Process**:
   - Note the conflict clearly
   - Flag it for human review
   - Proceed with the higher-priority source
   - Document the decision and rationale

3. **When Context Files Are Silent**:
   - Use this specification document as guidance
   - Apply industry best practices
   - Make reasonable assumptions
   - Document all assumptions made

---

## Project Overview
Build a premium, enterprise-level e-commerce website with exceptional aesthetics, performance, and user experience. The platform should reflect luxury, sophistication, and cutting-edge technology while maintaining intuitive usability.

**Note:** The specifications below provide a comprehensive framework, but always defer to the Project Context files for specific implementation details.

## Core Requirements

### 1. Technical Architecture

> **⚠️ IMPORTANT:** The tech stack below is for reference only.  
> **USE `final_tech_stack.md` for actual implementation.**  
> Only reference this section if `final_tech_stack.md` is missing details.

**Typical Enterprise Stack** (verify against `final_tech_stack.md`):
- **Framework**: Modern React-based (Next.js 14+ with App Router)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand or Redux Toolkit
- **Backend**: Headless CMS approach (consider Sanity, Contentful, or Shopify Hydrogen)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with multiple providers
- **Payment Processing**: Stripe + PayPal integration
- **Hosting**: Vercel or AWS with CDN
- **Performance Target**: 
  - Lighthouse score: 95+ across all metrics
  - Core Web Vitals: All green
  - Page load time: <1.5s

### 2. Design Philosophy & Aesthetics

> **⚠️ IMPORTANT:** All design decisions MUST align with `design_brief.md`.  
> The guidelines below are generic best practices - **prioritize design_brief.md** for:
> - Brand colors, typography, and visual identity
> - Tone, personality, and user perception goals
> - Specific aesthetic preferences and restrictions

#### Visual Identity (Verify with design_brief.md)
- **Design Style**: Premium minimalist with subtle luxury cues
- **Color Palette**: 
  - Primary: Sophisticated neutrals (deep charcoal, warm whites, cream)
  - Accent: Single bold color for CTAs
  - Supporting: Muted earth tones or jewel tones
- **Typography**: 
  - Headings: Elegant serif or refined sans-serif (e.g., Playfair Display, Cormorant)
  - Body: Clean, readable sans-serif (e.g., Inter, Neue Montreal, GT America)
  - Font scale: Modular type scale for visual hierarchy
- **Spacing**: Generous whitespace, breathing room between elements
- **Imagery**: High-quality product photography with consistent lighting and backgrounds

#### UI Components
- Micro-interactions on all interactive elements
- Smooth page transitions (150-300ms duration)
- Parallax scrolling on hero sections
- Sophisticated hover states with subtle animations
- Premium loading states (elegant skeleton screens, not spinners)
- Glass-morphism or subtle depth effects where appropriate
- Custom cursors or cursor effects for desktop

### 3. Core E-Commerce Features

> **⚠️ IMPORTANT:** Validate all user flows against `flow.md`.  
> Features below are comprehensive, but `flow.md` defines the specific:
> - User journeys and navigation paths
> - Interaction patterns and behavior
> - Page transitions and state changes
> 
> **If flow.md specifies different flows, follow flow.md.**

#### Product Management
- Advanced product catalog with multiple views (grid, list, masonry)
- Dynamic filtering and sorting with instant results
- Smart search with autocomplete and suggestions
- Product quick-view modal
- Zoom and 360° product viewer
- Size guides and fit recommendations
- Product comparison feature
- Wishlist/favorites with persistent storage
- Recently viewed products
- Stock level indicators
- Pre-order and back-in-stock notifications

#### Shopping Experience
- Persistent cart across devices (sync with account)
- Guest checkout option
- One-click checkout for returning customers
- Real-time shipping calculation
- Multiple shipping options
- Gift wrapping and personalization options
- Order tracking portal
- Easy returns and exchanges interface
- Discount/promo code system
- Gift cards support

#### Checkout Flow
- Multi-step checkout with progress indicator
- Address autocomplete
- Saved addresses and payment methods
- Order summary with itemized breakdown
- Tax calculation by region
- Multiple payment methods
- 3D Secure payment authentication
- Order confirmation with email receipt
- Post-purchase upsells (tastefully done)

### 4. Enterprise Features

#### User Accounts
- Comprehensive user dashboard
- Order history with re-order capability
- Saved addresses and payment methods
- Wishlist management
- Email preference center
- Account security settings (2FA)
- Loyalty/rewards program integration

#### Admin Dashboard
- Comprehensive analytics overview
- Product management (CRUD operations)
- Inventory management with low stock alerts
- Order management and fulfillment tracking
- Customer management
- Discount and promotion creation
- Content management
- Site-wide settings configuration
- Multi-admin role management

#### Internationalization
- Multi-currency support with auto-detection
- Multi-language support (i18n)
- Region-specific pricing
- Localized content
- International shipping zones

#### Marketing & Personalization
- Email marketing integration (Klaviyo/Mailchimp)
- Personalized product recommendations
- Abandoned cart recovery
- Exit-intent popups (elegant, non-intrusive)
- Social proof notifications
- Customer reviews and ratings
- Instagram/social media feed integration
- Blog/editorial content section
- SEO optimization (meta tags, structured data, sitemap)

### 5. Premium UI/UX Elements

#### Homepage
- Immersive hero section with video or high-quality imagery
- Featured collections with smooth carousel
- Editorial content sections
- Social proof section (reviews, press mentions)
- Newsletter signup (elegant inline form)
- Instagram feed integration
- Trending/bestseller showcases
- Seasonal campaigns section

#### Product Pages
- Sticky product images on scroll
- Image gallery with thumbnails and zoom
- Detailed product information accordion
- Size/variant selector with visual feedback
- Add to cart with micro-animation
- Related products carousel
- Customer reviews section
- Shipping and returns information
- Share functionality

#### Navigation
- Mega menu with category previews
- Sticky header with smart hide/show on scroll
- Search overlay with trending searches
- Mobile navigation with smooth transitions
- Breadcrumb navigation
- Quick access to account and cart

#### Animations & Interactions
- Smooth scroll behavior
- Entrance animations for elements (stagger effect)
- Hover effects on product cards
- Smooth transitions between pages
- Loading states for all async operations
- Success/error notifications (toast messages)
- Skeleton screens for content loading

### 6. Performance & Optimization
- Image optimization (WebP, AVIF formats)
- Lazy loading for images and components
- Code splitting and dynamic imports
- Server-side rendering for critical pages
- Static generation where applicable
- Efficient caching strategy
- Prefetching for likely navigation paths
- Bundle size optimization

### 7. Security & Compliance
- HTTPS everywhere
- GDPR compliance (cookie consent, privacy policy)
- PCI DSS compliance for payments
- Secure authentication flow
- Rate limiting on APIs
- Input validation and sanitization
- XSS and CSRF protection
- Regular security audits

### 8. Analytics & Tracking
- Google Analytics 4 integration
- Facebook Pixel
- Conversion tracking
- Heatmap integration (Hotjar/Clarity)
- A/B testing capability
- Custom event tracking
- Funnel analysis

### 9. Accessibility
- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Screen reader optimization
- Proper ARIA labels
- Color contrast compliance
- Focus indicators
- Alt text for all images

### 10. Mobile Experience
- Mobile-first design approach
- Touch-optimized interactions
- Swipe gestures where appropriate
- Bottom navigation for key actions
- Simplified mobile checkout
- Mobile-optimized images
- Responsive typography

## Development Workflow

### Phase 0: Context Analysis (Day 1)
**MANDATORY FIRST STEP:**
- Read and analyze ALL Project Context files
- Extract key requirements from `build-project.md`
- Understand design principles from `design_brief.md`
- Confirm tech stack from `final_tech_stack.md`
- Review user flows from `flow.md`
- Study implementation approach from `implementation_plan.md`
- Create a consolidated requirements checklist
- Identify any conflicts or gaps requiring clarification

### Phase 1: Foundation (Week 1)
- Setup development environment per `final_tech_stack.md`
- Configure tech stack as specified in context files
- Create design system per `design_brief.md` guidelines
- Setup routing structure based on `flow.md`
- Implement authentication

### Phase 2: Core Features (Week 2-3)
- Build product catalog and filtering
- Implement shopping cart
- Create checkout flow
- Payment integration
- Order management

### Phase 3: Premium Features (Week 4)
- Advanced animations and interactions
- User dashboard
- Admin panel
- Email integrations
- Analytics setup

### Phase 4: Polish & Optimization (Week 5)
- Performance optimization
- Cross-browser testing
- Accessibility audit
- SEO optimization
- Content population

### Phase 5: Launch Preparation (Week 6)
- Security audit
- Load testing
- Documentation
- Training materials
- Soft launch and monitoring

## Quality Standards

### Code Quality
- TypeScript for type safety
- ESLint and Prettier for code consistency
- Component-driven development
- Comprehensive comments for complex logic
- Reusable, modular components
- Custom hooks for shared logic
- Error boundaries for graceful error handling

### Testing
- Unit tests for utilities and helpers
- Component testing with React Testing Library
- E2E tests for critical user flows (Playwright)
- Visual regression testing
- Performance monitoring

### Documentation
- Component documentation with examples
- API documentation
- Setup and deployment guides
- Admin user guide
- Developer onboarding docs

## Deliverables
1. Fully functional e-commerce website
2. Admin dashboard
3. Component library/design system
4. Documentation suite
5. Deployment configuration
6. Analytics setup
7. SEO optimization
8. Performance report

## Success Metrics
- Page load time <1.5s
- Lighthouse scores >95
- Mobile conversion rate optimization
- Cart abandonment <70%
- Checkout completion rate >85%
- Zero critical accessibility issues
- 99.9% uptime

## Additional Considerations
- Scalability: Architecture should support 10,000+ products
- Traffic: Optimized for 100,000+ monthly visitors
- Conversion: Focus on reducing friction in purchase flow
- Brand: Every interaction should feel premium and intentional
- Future-proof: Built with modern best practices for easy updates

---

## Instructions for AI Agent

### STEP 1: Read Project Context (MANDATORY)
**Before ANY development work:**
```
1. Navigate to Project Context folder
2. Read build-project.md → Core project scope and requirements
3. Read design_brief.md → Visual identity and aesthetic rules
4. Read final_tech_stack.md → Technology decisions (DO NOT deviate)
5. Read flow.md → User journey and interaction patterns
6. Read implementation_plan.md → Development approach and timeline
7. Create a mental model of the complete project
8. Note any areas needing clarification
```

### STEP 2: Clarify and Validate
**After reading context files, ask:**
1. Any conflicts between context files and this specification?
2. Any ambiguities in the requirements that need clarification?
3. Any missing information needed to proceed?
4. Confirm understanding of brand personality and target audience
5. Validate tech stack choices align with project goals

### STEP 3: Begin Development
**Follow this order:**
1. **Refer to context files FIRST** for all decisions
2. Use this specification as supplementary guidance only
3. When context files are silent on a topic, use this spec
4. Document any assumptions or decisions made
5. Flag deviations from context files (with justification)

### During Development Guidelines

**Continuous reference:**
- Check `design_brief.md` for all aesthetic decisions
- Validate against `flow.md` for user experience choices
- Confirm tech choices against `final_tech_stack.md`
- Track progress against `implementation_plan.md`

**Communication:**
- Show progress at each major milestone
- Provide code explanations for complex implementations
- Suggest optimizations aligned with project context
- Flag any potential issues or limitations early
- Offer alternatives only when context allows flexibility

**Priority order:**
1. **Project Context files** (PRIMARY SOURCE OF TRUTH)
2. Core e-commerce functionality (browse, cart, checkout)
3. Premium aesthetic per design_brief.md
4. Performance and optimization per tech requirements
5. Admin features and management
6. Advanced features and integrations

### Quality Checkpoints
Before completing each phase:
- ✓ Aligns with build-project.md requirements
- ✓ Follows design_brief.md aesthetic guidelines  
- ✓ Uses final_tech_stack.md approved technologies
- ✓ Implements flow.md user journeys correctly
- ✓ Progresses per implementation_plan.md timeline
- ✓ Meets all specifications in this document

---

## 📋 Quick Reference Guide

### Context Files Decision Matrix

| **Question** | **Check This File** |
|-------------|---------------------|
| What technology should I use? | `final_tech_stack.md` ✓ |
| What are the core project requirements? | `build-project.md` ✓ |
| What colors/fonts/design style? | `design_brief.md` ✓ |
| How should this user flow work? | `flow.md` ✓ |
| What should I build in which phase? | `implementation_plan.md` ✓ |
| Best practices for implementation? | This document |

### Before Writing Any Code:

```
Step 1: Read all 5 context files ✓
Step 2: Ask clarifying questions ✓
Step 3: Confirm understanding ✓
Step 4: Begin Phase 0 (Context Analysis) ✓
Step 5: Start development ✓
```

### Remember:

- 🎯 **Context files = Source of truth**
- 📖 **This document = Best practices guide**
- ⚠️ **When in conflict = Context files win**
- 💡 **When unclear = Ask for clarification**
- ✅ **Always validate = Check against context files**