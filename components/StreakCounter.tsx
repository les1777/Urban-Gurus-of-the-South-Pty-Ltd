import React from 'react';

interface StreakCounterProps {
  count: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ count }) => {
  return (
    <div className="text-center mb-4 text-lg font-semibold text-orange-600">
      <span role="img" aria-label="fire">🔥</span> {count} moments of care logged! Keep glowing.
    </div>
  );
};

export default StreakCounter;