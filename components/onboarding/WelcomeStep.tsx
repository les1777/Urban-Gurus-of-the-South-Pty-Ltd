import React from 'react';

interface WelcomeStepProps {
  onNext: () => void;
  onShowPrivacy: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, onShowPrivacy }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-indigo-900 mb-4">Welcome to Parent flow</h2>
      <p className="text-gray-600 mb-8">
        Gentle, evidence-based steps for your first year. No diagnoses. Privacy built-in.
      </p>
      <div className="space-y-3">
        <button
          onClick={onNext}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Get Started
        </button>
        <button
          onClick={onShowPrivacy}
          className="w-full bg-transparent hover:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 border border-gray-300"
        >
          Read Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default WelcomeStep;