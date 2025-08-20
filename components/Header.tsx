import React from 'react';

interface HeaderProps {
  title: React.ReactNode;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <header className="text-center mb-6 relative">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-800 p-2 -ml-2"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <h1 className="text-3xl font-extrabold text-stone-800">Parent Flow</h1>
      <p className="text-stone-600/80 -mt-1 text-sm">by Urban Gurus of the South Pty Ltd</p>
      <div className="text-stone-700 mt-3">{title}</div>
    </header>
  );
};

export default Header;
