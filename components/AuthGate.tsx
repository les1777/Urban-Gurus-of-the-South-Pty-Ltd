
import React from 'react';

interface AuthGateProps {
  onLogin: () => void;
}

const AuthGate: React.FC<AuthGateProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-indigo-900 mb-1">Welcome to Parent flow</h2>
        <p className="text-gray-500 mb-6">by Urban Gurus of the South Pty Ltd</p>
        <button 
          onClick={onLogin} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Sign in to begin
        </button>
      </div>
    </div>
  );
};

export default AuthGate;