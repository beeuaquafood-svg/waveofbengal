# Complete Guide: Connecting the Analytics Dashboard to the Backend

This guide explains exactly how we will connect our beautiful new Next.js Frontend Analytics Dashboard to a robust Python (FastAPI) Backend to track real user behavior securely.

---

## The 3-Step Connection Strategy

To make this data real, we need three distinct systems communicating with each other:

1. **The Tracking Hook (Frontend Sender):** A silent script that runs in the background of your website collecting user telemetry.
2. **The Ingestion API (Backend Receiver):** A Python API endpoint that safely receives, validates, and stores this background data.
3. **The Admin Dashboard APIs (Backend Sender):** The Python endpoints that group and crunch the raw data into the metrics that the dashboard requests.

---

### Step 1: Building the `useTracking` Hook (Frontend)

We need to create a custom React Hook (`frontend/src/hooks/useTracking.js`) that operates globally (e.g., inside `layout.jsx`).

**What this hook will do:**

- **Visitor Identification:** On first load, it generates a unique UUID and stores it in `localStorage`. This allows the backend to know if they are a **"Repeat Visitor"** or a new user without needing them to log in.
- **Time Spent Tracker:** It records a `startTime` when a page loads. When the user navigates away or closes the tab (using `beforeunload`), it calculates the exact duration and sends a silent `keepalive` beacon request to the backend.
- **Device Parsing:** It grabs `navigator.userAgent` and sends it to the backend.
- **Product Hits:** If the user is on a product page, it pushes the exact product name/URL to the backend.
- **Location:** We will grab the user's IP address (often captured natively by the backend request headers) and resolve it to a **City**.

_Example Request from Hook to Backend:_

```json
POST /api/analytics/track
{
  "visitor_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "url_path": "/products/jumbo-tiger-prawns",
  "device_string": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)...",
  "time_spent_seconds": 45,
  "search_keyword": null
}
```

---

### Step 2: Setting up the FastAPI Backend Ingestion

In your backend codebase (Python FastAPI), we will create a dedicated database schema using an ORM like SQLAlchemy.

**A. Database Models Needed:**

- `VisitorLog` (Tracks UUIDs and their timestamps to calculate Retention/Repeat rates)
- `PageView` (Tracks `url_path`, duration, city, device type)
- `SearchEvent` (Tracks raw search queries typed into your search bars)

**B. The Ingestion Endpoint:**
We will create a `POST /api/analytics/track` route. It will:

1.  Receive the JSON payload from the React hook.
2.  Use a Python library like `user_agents` to translate the raw device string into "Mobile" or "Desktop".
3.  Use the request's IP address (e.g., `request.client.host`) and cross-reference it with a lightweight GeoIP database (like MaxMind) to identify the "City" safely.
4.  Write this processed row efficiently into the SQL Database.

---

### Step 3: Fetching Data for the Admin Dashboard

Now that the backend is amassing thousands of tracking rows, we need to feed it into the UI we just built.

We will create a massive aggregation endpoint on the backend: `GET /api/admin/analytics/overview`.

**What the Python Backend will compute (using SQL `GROUP BY` and `COUNT`):**

- **`topCities`**: `SELECT city, COUNT(*) ... GROUP BY city ORDER BY count DESC LIMIT 5`
- **`mostViewedProducts`**: `SELECT url_path, SUM(views) ... WHERE url_path LIKE '/products/%' GROUP BY url_path ORDER BY count DESC LIMIT 5`
- **`deviceDistribution`**: Count total Mobile rows vs Desktop rows and convert to percentages.
- **`avgTimeSpent`**: Calculate the average across the `time_spent_seconds` column.

**Connecting the UI:**
Finally, we will go back into `admin/analytics/page.jsx` and replace the `mockAnalyticsData` with a real `useEffect` fetch call:

```javascript
useEffect(() => {
  const fetchAnalytics = async () => {
    // Calling the FastAPI Admin Router
    const response = await fetch(
      "http://localhost:8000/api/admin/analytics/overview",
    );
    const realData = await response.json();
    setData(realData);
  };

  fetchAnalytics();
}, []);
```

---

### When you are ready to begin...

Simply tell me: **"Start with the Backend Architecture"** (to start writing the Python database models and FastAPI routes) or **"Start with the Frontend Tracking Hook"** (to start writing the script that watches the users).
