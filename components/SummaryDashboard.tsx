import React from 'react';

interface SummaryDashboardProps {
  completedCount: number;
  totalCount: number;
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ completedCount, totalCount }) => {
  const message = totalCount > 0 
    ? `You've made space for ${completedCount} out of ${totalCount} moments.`
    : "Let's set some intentions for the day.";
  
  return (
    <div className="bg-sky-100 p-4 rounded-lg mb-4 text-center text-sky-900">
      <strong className="font-bold">Today's rhythm</strong>
      <p className="text-sm mt-1">{message}</p>
    </div>
  );
};

export default SummaryDashboard;