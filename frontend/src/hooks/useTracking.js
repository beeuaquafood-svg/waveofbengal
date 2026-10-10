import { useEffect, useRef } from 'react';
import { logEvent } from '../lib/analytics';

export function useTracking() {
  const timeoutRef = useRef(null);

  const trackSearch = (query) => {
    if (!query || query.length < 2) return;

    // Debounce the search tracking to not spam backend/analytics
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      // 1. Log to Firebase Analytics
      logEvent('search', { search_term: query });

      // 2. Post to custom backend analytics tracking
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'search',
            query: query,
            timestamp: new Date().toISOString()
          }),
        });
        if (!response.ok) {
           console.warn('Failed to log search to backend analytics');
        }
      } catch (error) {
        console.error('Analytics tracking error:', error);
      }
    }, 1000); // 1-second debounce
  };

  const trackPageview = (page_url) => {
    logEvent('page_view', { page_location: page_url });
  };

  const trackCartAdd = (item) => {
    logEvent('add_to_cart', {
      currency: "INR",
      value: item.price,
      items: [
        { item_id: item.id, item_name: item.name, price: item.price, quantity: 1 }
      ]
    });
  };

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { trackSearch, trackPageview, trackCartAdd, logEvent };
}
