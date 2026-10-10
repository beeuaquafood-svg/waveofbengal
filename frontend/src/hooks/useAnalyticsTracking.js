'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useAnalyticsTracking() {
  const pathname = usePathname();
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Generate or retrieve persistent Visitor ID
    let visitorId = localStorage.getItem('wob_visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('wob_visitor_id', visitorId);
    }

    // Reset the start time exactly when the user navigates to a new page
    startTimeRef.current = Date.now();

    const sendTelemetry = () => {
      const timeSpentSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      const payload = {
        visitor_id: visitorId,
        url_path: pathname,
        device_string: navigator.userAgent,
        time_spent_seconds: timeSpentSeconds,
        search_keyword: null, // Will be populated specifically from the search bar component later
        results_found: 0
      };

      // We use navigator.sendBeacon for absolute reliability. 
      // It fires a silent POST request in the background exactly as the tab closes or unloads.
      const url = "http://localhost:8000/api/analytics/track";
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
    };

    // Attach to tab close / navigation away events
    window.addEventListener('beforeunload', sendTelemetry);
    
    return () => {
      // Whenever the React component unmounts (e.g., Next.js client-side navigation)
      sendTelemetry();
      window.removeEventListener('beforeunload', sendTelemetry);
    };
  }, [pathname]); // Re-run tracker engine every time the URL path changes
}
