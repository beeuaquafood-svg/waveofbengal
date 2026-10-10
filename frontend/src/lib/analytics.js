import { getAnalytics, isSupported, logEvent as firebaseLogEvent } from 'firebase/analytics';
import { app } from './firebase';

let analytics = null;

export const initAnalytics = async () => {
  if (app && await isSupported()) {
    analytics = getAnalytics(app);
  }
};

export const logEvent = (eventName, eventParams = {}) => {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, eventParams);
  } else {
    // Fallback or dev logging
    console.log(`[Analytics - Dev] Target: ${eventName}`, eventParams);
  }
};
