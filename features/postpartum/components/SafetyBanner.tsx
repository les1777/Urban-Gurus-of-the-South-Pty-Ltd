import React from 'react';
import { useSafety } from '../hooks/useSafety';
import { usePostpartum } from '../hooks/usePostpartum';
import { safetyCopy } from '../copy/safety.en-ZA';

export const SafetyBanner: React.FC = () => {
  const { helplines, isLoading } = useSafety();
  const { setView } = usePostpartum();

  // Don't show the banner if there are no helplines and it's not loading
  if (!isLoading && helplines.length === 0) {
    return null;
  }
  
  const handleClick = () => {
    setView('crisis');
  };

  return (
    <div className="bg-red-100 border-b-2 border-red-200 p-3 text-center sticky top-0 z-40">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <p className="text-sm font-medium text-red-800">
          {safetyCopy.BANNER_TEXT}
        </p>
        <button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-1 px-3 rounded-full transition-colors"
        >
          {safetyCopy.BANNER_CTA}
        </button>
      </div>
    </div>
  );
};
