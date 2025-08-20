import React, { createContext, useState, useEffect } from 'react';
import type { Helpline, SafetyContextType } from '../types';

export const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

// In a real app, this would come from process.env.HELPLINE_JSON_URL
const HELPLINE_URL = 'https://gist.githubusercontent.com/addyosmani/d526e382be51cff24b3b18599422a571/raw/009f38b20468087c53dbe67b6678b87d55982d63/helplines.en-ZA.json';
const REGION = 'en-ZA'; // from process.env.REGION

const FALLBACK_HELPLINES: Helpline[] = [
  {
    name: "SADAG Mental Health Line",
    phone: "0112344837",
    description: "24hr helpline for anxiety & depression."
  },
  {
    name: "Lifeline South Africa",
    phone: "0861322322",
    description: "National crisis support line."
  },
  {
    name: "WhatsApp Support",
    whatsapp: "+27871503134",
    description: "Text-based support."
  }
];

export const SafetyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [helplines, setHelplines] = useState<Helpline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHelplines = async () => {
      if (!HELPLINE_URL) {
        console.warn('HELPLINE_JSON_URL is not configured. Using fallback data.');
        setHelplines(FALLBACK_HELPLINES);
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(HELPLINE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch helpline data');
        }
        const data: Helpline[] = await response.json();
        setHelplines(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.warn('Error fetching helplines, using fallback data:', err);
        setHelplines(FALLBACK_HELPLINES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHelplines();
  }, []);
  
  const value = { helplines, isLoading, error };

  return <SafetyContext.Provider value={value}>{children}</SafetyContext.Provider>;
};
