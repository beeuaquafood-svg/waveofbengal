# Wave of Bengal — Design Brief
### Visual Identity for the React Rebuild

---

## Brand Essence

**Wave of Bengal** is a **luxury seafood brand** — not a cheap marketplace. Every design decision should communicate: **premium quality, ocean freshness, trust, and sustainability**.

Think: high-end restaurant menu meets clean e-commerce — not a busy grocery store.

---

## Color Palette

### Primary Colors
| Token | Hex | Role |
|---|---|---|
| `ocean-dark` | `#0a1f2e` | Primary background, deep ocean |
| `ocean-teal` | `#0d2b3a` | Card backgrounds, secondary surfaces |
| `teal-gradient-start` | `#0a2530` | Gradient backgrounds |
| `teal-gradient-end` | `#0d3545` | Gradient backgrounds |
| `gold` | `#c9a962` | Primary accent, CTAs, highlights |
| `gold-light` | `#d4b978` | Hover states, secondary accent |

### Supporting Colors
| Token | Hex | Role |
|---|---|---|
| `text-light` | `#f0ead6` | Primary text on dark backgrounds |
| `text-muted` | `#8a9bae` | Secondary/helper text |
| `border-subtle` | `rgba(201, 169, 98, 0.15)` | Card borders, dividers |
| `green` | `#2d8a4e` | Sustainability accents, success states |
| `error` | `#e74c3c` | Validation errors |

### TailwindCSS Custom Config
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'ocean-dark': '#0a1f2e',
        'ocean-teal': '#0d2b3a',
        'gold': '#c9a962',
        'gold-light': '#d4b978',
        'text-light': '#f0ead6',
        'text-muted': '#8a9bae',
        'wob-green': '#2d8a4e',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

---

## Typography

### Font Stack
| Usage | Font | Weight | Source |
|---|---|---|---|
| Headings (H1-H3) | **Playfair Display** | 400, 500, 600, 700 | Google Fonts |
| Body text, UI | **Inter** | 300, 400, 500, 600 | Google Fonts |

### Type Scale
| Element | Size | Weight | Tracking | Color |
|---|---|---|---|---|
| H1 (Hero) | 3rem (48px) | 700 | -0.02em | `text-light` |
| H2 (Section) | 2rem (32px) | 600 | -0.01em | `text-light` |
| H3 (Card title) | 1.25rem (20px) | 600 | normal | `text-light` |
| Subtitle | 0.875rem (14px) | 500 | 0.05em | `gold` |
| Body | 1rem (16px) | 300 | normal | `text-light` |
| Body small | 0.875rem (14px) | 400 | normal | `text-muted` |
| Button | 0.875rem (14px) | 600 | 0.05em | `ocean-dark` (on gold bg) |

### Next.js Font Loading
```javascript
// src/app/layout.jsx
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});
```

---

## Component Design Patterns

### Buttons

**Primary (CTA)** — Gold background, dark text
```
Background: #c9a962
Text: #0a1f2e
Border-radius: 6px
Padding: 14px 32px
Font: Inter 600, 14px, uppercase, 0.05em tracking
Hover: #d4b978, shadow 0 0 20px rgba(201, 169, 98, 0.3), translateY(-2px)
Active: translateY(0)
Transition: all 0.3s ease
```

**Secondary** — Transparent with gold border
```
Background: transparent
Border: 1px solid rgba(201, 169, 98, 0.4)
Text: #c9a962
Hover: background rgba(201, 169, 98, 0.1)
```

### Cards

**Product Cards** — Dark glass with subtle gold border
```
Background: linear-gradient(145deg, rgba(13, 43, 58, 0.95), rgba(10, 31, 46, 0.98))
Border: 1px solid rgba(201, 169, 98, 0.15)
Border-radius: 12px
Padding: 24px
Shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
Hover: border-color rgba(201, 169, 98, 0.4), translateY(-4px)
Transition: all 0.4s ease
```

### Form Inputs
```
Background: rgba(255, 255, 255, 0.05)
Border: 1px solid rgba(201, 169, 98, 0.2)
Border-radius: 8px
Text: #f0ead6
Placeholder: #8a9bae
Focus: border-color #c9a962, box-shadow 0 0 0 3px rgba(201, 169, 98, 0.15)
Padding: 12px 16px
```

---

## Animations & Parallax

### Parallax Scrolling (Framer Motion)
| Element | Effect | Speed |
|---|---|---|
| Hero background (image/video) | Moves slower than scroll | `y: [0, -100]` at 0.5x scroll speed |
| Hero text | Fades and moves up | `opacity: [1, 0]`, `y: [0, -50]` |
| Trust badges | Stagger fade-in from bottom | 0.1s delay between each, `y: [30, 0]` |
| Section headers | Fade in + slide up on scroll | `useInView` trigger, `y: [40, 0]` |
| Product cards | Stagger animation in grid | 0.08s delay, scale `[0.95, 1]` + opacity |

### Micro-Animations
| Interaction | Animation |
|---|---|
| Button hover | `translateY(-2px)` + gold glow shadow |
| Card hover | `translateY(-4px)` + border brightens |
| Add to cart | Toast slides in from right, 3s duration |
| Page transition | Fade + slight slide (Framer Motion `AnimatePresence`) |
| Nav scroll | Background transitions from transparent to dark teal with blur |
| Loading | Skeleton pulse in gold tint |

### Parallax Implementation Pattern
```jsx
// Using Framer Motion useScroll + useTransform
import { motion, useScroll, useTransform } from 'framer-motion';

function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, -150]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* Background image/video */}
      </motion.div>
      <motion.div style={{ opacity: textOpacity, y: textY }}>
        <h1>Fresh From Ocean to Your Doorstep</h1>
      </motion.div>
    </section>
  );
}
```

---

## Spacing System

| Token | Value | Usage |
|---|---|---|
| `xs` | 4px | Icon gaps, tight spacing |
| `sm` | 8px | Inside small components |
| `md` | 16px | Default padding, gaps |
| `lg` | 24px | Section padding, card padding |
| `xl` | 32px | Between sections |
| `2xl` | 48px | Major section spacing |
| `3xl` | 64px | Page section dividers |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|---|---|---|
| Mobile | <768px | Single column, hamburger nav, full-width buttons |
| Tablet | 768–1024px | 2-column grid, condensed nav |
| Desktop | >1024px | 3-column grid, full nav, side-by-side checkout |

---

## Image Guidelines

| Type | Format | Size | Notes |
|---|---|---|---|
| Product photos | WebP (via Next.js `<Image>`) | 800×600px source | Auto-optimized by Next.js |
| Hero background | WebP or MP4 video | Full viewport | Parallax container |
| Icons | SVG inline | — | Gold color (#c9a962) |
| Logo | SVG or PNG | 50px height | Nav bar |

---

## Dark Theme Only

This is a **dark-theme-only** design. There is no light mode. The entire site uses `ocean-dark` (#0a1f2e) as the base background with gold accents. This creates the luxury, premium feel that defines the Wave of Bengal brand.

---

## Design Don'ts

- ❌ No bright/neon colors — this is a luxury brand
- ❌ No white backgrounds — always dark teal/ocean dark
- ❌ No generic sans-serif — always Playfair Display for headings
- ❌ No sharp corners on cards — always border-radius 8-12px
- ❌ No plain borders — always subtle gold-tinted rgba borders
- ❌ No instant transitions — always ease/ease-out with 0.3-0.4s duration
- ❌ No default browser focus rings — custom gold focus styles
