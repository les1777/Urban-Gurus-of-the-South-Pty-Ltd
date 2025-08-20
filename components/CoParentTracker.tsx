
import React from 'react';

const TaskItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-center space-x-3">
    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
    <span>{children}</span>
  </li>
);

const CoParentTracker: React.FC = () => {
  return (
    <div className="bg-sky-50 p-4 rounded-lg mb-6 text-sky-900 border border-sky-100">
      <h4 className="font-bold text-lg mb-3">👥 Co-parenting sync</h4>
      <ul className="space-y-2">
        <TaskItem>Take turns with bottle prep</TaskItem>
        <TaskItem>Review baby sleep tracker</TaskItem>
        <TaskItem>Compliment each other’s effort</TaskItem>
      </ul>
    </div>
  );
};

export default CoParentTracker;