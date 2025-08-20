import React from 'react';
import type { OnboardingData } from '../../types';

interface FamilyInfoStepProps {
  data: Pick<OnboardingData, 'name' | 'partnerName' | 'babyName' | 'babyDob'>;
  setData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>;
  onNext: () => void;
  onBack: () => void;
}

const FamilyInfoStep: React.FC<FamilyInfoStepProps> = ({ data, setData, onNext, onBack }) => {
  const isFormValid = data.name && data.babyName && data.babyDob;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">About your family</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={data.name || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Alex"
          />
        </div>

        <div>
          <label htmlFor="partnerName" className="block text-sm font-medium text-gray-700">
            Co-parent? Add partner (optional)
          </label>
          <input
            type="text"
            id="partnerName"
            value={data.partnerName || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Jordan"
          />
        </div>

        <div>
          <label htmlFor="babyName" className="block text-sm font-medium text-gray-700">
            Baby nickname
          </label>
          <input
            type="text"
            id="babyName"
            value={data.babyName || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Sam"
          />
        </div>

        <div>
          <label htmlFor="babyDob" className="block text-sm font-medium text-gray-700">
            Baby date of birth
          </label>
          <input
            type="date"
            id="babyDob"
            value={data.babyDob || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="text-xs text-gray-500 mt-1">We ask for baby age to personalise your next steps.</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 font-semibold py-2 px-4 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FamilyInfoStep;