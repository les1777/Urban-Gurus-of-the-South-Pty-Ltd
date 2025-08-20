import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Spinner;
