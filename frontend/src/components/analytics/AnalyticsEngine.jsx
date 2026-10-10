'use client';

import { useAnalyticsTracking } from '@/hooks/useAnalyticsTracking';

export default function AnalyticsEngine() {
  // Initiates the stealth tracking engine globally when placed in Root Layout
  useAnalyticsTracking();

  // Returns completely null so it never affects the visual DOM
  return null;
}
