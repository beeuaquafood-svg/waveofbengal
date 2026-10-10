
# Complete Analytics System Implementation Plan

This document outlines the step-by-step technical strategy to build a robust, comprehensive Analytics backend and how the metrics will powerfully manifest on the frontend Admin Analytics Dashboard.

Our main focus is the **Backend Architecture**, capturing rich data about user behavior in a highly performant and secure way for "Wave of Bengal".

---

## 1. Core Metrics to Capture & Track

As requested, the system will track and expose the following advanced data points:

1. **Device Information:** (Mobile vs. Desktop, OS, Browser type)
2. **Keyword Searches:** (What users type into the search bar, tracking intent)
3. **Time Spent on Website:** (Average session duration and precise page-level engagement)
4. **City-Wise Analytics:** (Geographic segmentation using IP geolocation or browser APIs)
5. **Repeat Visitors:** (Identifying unique vs. returning users over a 30-day window)
6. **Most Viewed Products:** (Tracking hits to individual product pages to gauge item-level demand)

---

## 2. Backend Architecture (FastAPI + Database)

We will build a dedicated Python module (`backend/database/analytics.py` and `backend/api/analytics_router.py`) to process streaming telemetry data from the frontend.

### A. Database Schema Design

We will introduce tables (or extend our existing SQL setup) specifically for telemetry.

- **`page_views` Table:** Tracks precise user visits.
  - `session_id` (String - unique browser identifier)
  - `url_path` (String - e.g., `/products/tiger-prawns`)
  - `time_spent_seconds` (Integer - updated via 'ping' requests or `beforeUnload` beacons)
  - `city` (String - derived via IP lookup module on the backend)
  - `device_type` (Enum: Mobile, Tablet, Desktop)
  - `timestamp` (DateTime)

- **`search_events` Table:** Tracks user intent.
  - `query` (String - exactly what the user typed)
  - `results_found` (Integer - how many products matched)
  - `timestamp` (DateTime)

- **`visitors` Table:** Tracks unique retention.
  - `visitor_id` (String - UUID stored in frontend LocalStorage)
  - `is_repeat` (Boolean)
  - `last_visit` (DateTime)

### B. Analytical Endpoints (API)

The backend will expose strictly protected admin endpoints that aggregate this data:

- `GET /api/admin/analytics/overview` - Returns total active users, avg time spent, and repeat visitor %.
- `GET /api/admin/analytics/geography` - Returns agg data group by `city`.
- `GET /api/admin/analytics/products/top` - Returns the top 10 rows grouped by `url_path` associated with products.
- `GET /api/admin/analytics/search/top-keywords` - Returns high-frequency search keywords.
- `POST /api/analytics/track` - The heavily optimized ingestion endpoint. Receives bulk payloads from the frontend.

---

## 3. Frontend Telemetry Strategy (Data Collection)

To build a flawless backend, the Frontend needs a smart tracking hook (e.g., `useTracking.js`), which will send lightweight, non-blocking requests to our `POST /api/analytics/track` backend endpoint.

- **Device Info & Geolocation:** We will send the `navigator.userAgent`. The backend will parse it to identify devices, and the backend will map the user's IP to a `City`.
- **Time Spent Tracker:** A `setInterval` or `visibilitychange` listener will track exactly how many seconds the user actively leaves the tab open, sending a "beacon" to the backend right before the user closes the tab.
- **Unique Visitor IDs:** When a user arrives, we set a permanent UUID in `localStorage`. If they return > 24 hours later with that ID, the backend flags them as a "Repeat Visitor".

---

## 4. UI: What The Analytics Dashboard Will Contain

When this robust data flows into the Administration Dashboard, the page will transform into a luxury command center containing:

### 1. The Global Pulse (Top Metric Cards)

- **Average Session Duration:** (e.g., "04m 12s" highlighted in gold)
- **Retention Rate:** (e.g., "42% of users are Repeat Visitors")
- **Live Traffic:** (A blinking indicator showing users active right now)

### 2. Geographic & Device Matrix (Split Pane)

- **City Heatmap/List:** A sleek, glassmorphic table listing top cities (e.g., "Kolkata: 45%", "New York: 12%").
- **Device Breakdown:** A minimalist donut chart showing Mobile (60%) vs. Desktop (40%).

### 3. Product & Intent Discovery (Main Content Area)

- **Most Viewed Products (The Bestsellers):** A visual grid or ranked list showing the exact view counts of the top 5 products (e.g., "Jumbo Tiger Prawns - 1,204 views").
- **Search Intent Ledger:** A scrolling data table identifying the precise "Keywords" users are typing, along with their volume, empowering you to adjust inventory based on what people are secretly looking for.

---

## Technical Next Steps for Implementation

1. Initialize the SQLite/Postgres Analytics schema in `backend/database/models.py`.
2. Write the FastAPI tracking endpoints to consume, parse IP/user-agents, and save telemetry robustly.
3. Hook up the `useTracking` script in the Next.js frontend root layout.
4. Replace the mocked data in `admin/analytics/page.jsx` with active `fetch()` calls to the new backend endpoints.
