import React from 'react';
import type { ParentProfile } from '../../types';
import { PARENTING_STYLES, PRIMARY_CONCERNS, PARENTING_SETUP } from '../../constants';
import PrivacyNotice from './PrivacyNotice';

interface ParentProfileStepProps {
  data: ParentProfile;
  setData: React.Dispatch<React.SetStateAction<ParentProfile>>;
  onNext: () => void;
}

const ParentProfileStep: React.FC<ParentProfileStepProps> = ({ data, setData, onNext }) => {
  const handleConcernToggle = (concern: string) => {
    setData(prev => {
      const newConcerns = prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern];
      return { ...prev, concerns: newConcerns };
    });
  };

  const isFormValid = data.name && data.parentingStyle && data.concerns.length > 0 && data.parentingSetup;

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">Welcome! Let's get to know you.</h2>
      <p className="text-gray-600 mb-6">This helps us personalize your daily flow.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Alex"
          />
        </div>

         <div>
            <label className="block text-sm font-medium text-gray-700">How would you describe your setup?</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
                {PARENTING_SETUP.map(setup => (
                     <button
                        key={setup}
                        type="button"
                        onClick={() => setData(prev => ({ ...prev, parentingSetup: setup }))}
                        className={`text-sm text-center p-2 rounded-lg border-2 transition-colors ${
                            data.parentingSetup === setup
                            ? 'bg-indigo-100 border-indigo-500 text-indigo-800'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {setup}
                    </button>
                ))}
            </div>
        </div>

        <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700">Parenting style</label>
            <select
                id="style"
                value={data.parentingStyle}
                onChange={e => setData(prev => ({...prev, parentingStyle: e.target.value}))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option value="" disabled>Select a style...</option>
                {PARENTING_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">What's on your mind?</label>
            <p className="text-xs text-gray-500">Select your primary concerns.</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
                {PRIMARY_CONCERNS.map(concern => (
                     <button
                        key={concern}
                        type="button"
                        onClick={() => handleConcernToggle(concern)}
                        className={`text-sm text-center p-2 rounded-lg border-2 transition-colors ${
                            data.concerns.includes(concern) 
                            ? 'bg-indigo-100 border-indigo-500 text-indigo-800'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {concern}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <PrivacyNotice />

      <button
        onClick={onNext}
        disabled={!isFormValid}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default ParentProfileStep;