/**
 * Calculates the age in weeks from a given date of birth string (YYYY-MM-DD).
 * @param dobString - The date of birth string.
 * @returns The age in weeks, rounded down.
 */
export const calculateAgeInWeeks = (dobString: string): number => {
  if (!dobString) return 0;

  const dob = new Date(dobString);
  const today = new Date();
  
  // To prevent issues with timezones and time of day, we zero out the time part.
  dob.setUTCHours(0, 0, 0, 0);
  today.setUTCHours(0, 0, 0, 0);

  const diffInMs = today.getTime() - dob.getTime();
  const diffInWeeks = diffInMs / (1000 * 60 * 60 * 24 * 7);

  return Math.floor(diffInWeeks);
};

/**
 * Placeholder for a real analytics tracking service.
 * In a real app, this would integrate with a service like Mixpanel, Amplitude, etc.
 * @param eventName - The name of the event to track.
 * @param properties - An optional object of properties associated with the event.
 */
export const trackAnalytics = (eventName: string, properties: Record<string, any> = {}): void => {
  console.log(`[ANALYTICS EVENT]: ${eventName}`, properties);
  // Example integration:
  // if (window.mixpanel) {
  //   window.mixpanel.track(eventName, properties);
  // }
};
