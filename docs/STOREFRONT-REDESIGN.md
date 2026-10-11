# Wave of Bengal storefront redesign

## Customer journey

The entry URL opens the storefront directly. The home page introduces the brand and three selections; the collection is the one place to search, filter and sort all products. Every card leads to the same detail template, with explicit pack weights and prices. The customer chooses a pack, adds it to the bag, reviews quantities and costs, enters delivery details, and reviews the selection.

The visual system uses warm white, deep coastal green, native system typography, existing product photography, restrained borders and consistent spacing. Phone navigation, visible keyboard focus, labelled forms, reduced-motion support, empty states and unknown-product recovery are included. Story, standards, sustainability and account pages share the storefront shell.

## Functional corrections

- One shared catalogue for home, collection and details: all 12 listed products resolve, with consistent names and explicit existing prices.
- No invented star ratings. Removed duplicate splash and oversized catalogue hero.
- Bag identity includes product and pack size. Restoring local storage cannot overwrite the saved bag with the initial empty render. Invalid saved lines are discarded.
- Bag and checkout use the same shipping and estimated-tax calculation (existing ₹100 delivery / ₹2,000 threshold / 5% estimate retained).
- Sign-in supports existing Firebase email, Google and phone flows, password visibility, password reset, clear failure messages and a same-origin return destination. Registration preserves that destination.
- Browsing no longer waits for profile loading. Customer sign-in no longer provisions an administrator; admin records must be provisioned through a trusted server or Firebase console. Profile-read failures fail closed for admin access.

## Important launch limitations

**This PR is a storefront and shopping-flow redesign, not a completed payment backend.** The previous checkout collected raw card/CVV fields, generated a random order number locally, called an email endpoint and showed success without processing payment or persisting an authoritative order. That path is removed. The review screen explicitly states online ordering is not available, keeps the bag, and does not claim an order or payment succeeded.

Before enabling purchases:

1. Connect a payment provider and server-side order service. Validate SKU/pack prices, inventory, address serviceability and totals on the server; handle idempotency and verified payment webhooks before confirmation.
2. Move the catalogue and inventory from browser-local admin data to a shared authoritative service. Local catalogue editing remains compatible, but it is not multi-user inventory.
3. Configure Firebase public environment variables, allowed domains, enabled email/Google/phone providers and deployed Firestore rules. Verify real sign-in, SMS/reCAPTCHA, password reset, registration and profile updates against that configuration. No live credentials or SMS were used during this work.
4. Confirm product images, ingredients/allergens, stock, pack weights, price/tax/delivery policy and existing certification/history claims. Several original catalogue entries reuse photographs; no new product-specific photography was fabricated.
5. Audit the legacy email/invoice APIs before connecting them to paid checkout; they remain outside this UI change.

## Validation

Run from `frontend`:

```sh
npm ci
npm test
npm run build
npx playwright install chromium
npm run test:storefront
```

`test:storefront` starts a local production server, checks 11 routes at 375, 390, 768, 1024 and 1440px, and exercises mobile navigation, filters/search, pack selection, persisted bag, delivery review, unavailable products and the authentication return URL. Screenshots are written to ignored `frontend/test-results/`. An existing Chromium binary can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.

Five Node regression tests cover variant separation, restored bag validation, invalid additions, catalogue completeness and shared totals. ESLint passes for the changed storefront/auth/context files. The full repository lint command still reports existing errors in untouched admin and legacy components/hooks; they are not hidden or suppressed by this PR.

Browser checks cover Chromium. Real-device Safari/Firefox and live authentication/payment services have not been verified.
