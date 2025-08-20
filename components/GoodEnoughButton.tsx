import React from 'react';

interface GoodEnoughButtonProps {
  onClick: () => void;
}

const GoodEnoughButton: React.FC<GoodEnoughButtonProps> = ({ onClick }) => {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={onClick}
        className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
      >
        I've Done Enough For Today
      </button>
    </div>
  );
};

export default GoodEnoughButton;