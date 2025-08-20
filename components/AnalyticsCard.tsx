import React from 'react';

interface AnalyticsCardProps {
  completedCount: number;
  totalCount: number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ completedCount, totalCount }) => {
  const missed = totalCount - completedCount;
  const consistency = totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(1) : 0;

  return (
    <div className="bg-green-50 p-4 rounded-lg mb-6">
      <h4 className="text-lg font-semibold text-green-800 mb-2">🌱 Your journey</h4>
      <ul className="space-y-1 text-green-700">
        <li>✔️ Moments Completed: <span className="font-bold">{completedCount}</span></li>
        <li>🧘 Opportunities for Rest: <span className="font-bold">{missed}</span></li>
        <li>📈 Consistency: <span className="font-bold">{consistency}%</span></li>
      </ul>
    </div>
  );
};

export default AnalyticsCard;