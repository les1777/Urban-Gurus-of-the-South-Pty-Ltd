
import React, { useState, useEffect } from 'react';
import { LINDY_QUOTES } from '../constants';

const LindyQuote: React.FC = () => {
  const [quote, setQuote] = useState(LINDY_QUOTES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(LINDY_QUOTES[Math.floor(Math.random() * LINDY_QUOTES.length)]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <blockquote className="text-center italic text-gray-500 mb-4 p-4 bg-white/50 rounded-lg">
      {quote}
    </blockquote>
  );
};

export default LindyQuote;
