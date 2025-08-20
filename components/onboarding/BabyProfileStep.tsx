import React from 'react';
import type { BabyProfile } from '../../types';

interface BabyProfileStepProps {
  data: BabyProfile;
  setData: React.Dispatch<React.SetStateAction<BabyProfile>>;
  onBack: () => void;
  onFinish: () => void;
}

const BabyProfileStep: React.FC<BabyProfileStepProps> = ({ data, setData, onBack, onFinish }) => {
    const isFormValid = data.name && data.dob;

    return (
    <div>
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">Tell us about your little one.</h2>
        <p className="text-gray-600 mb-6">Age-appropriate suggestions are coming your way!</p>
        
        <div className="space-y-4">
            <div>
                <label htmlFor="babyName" className="block text-sm font-medium text-gray-700">Baby's Name or Nickname</label>
                <input
                    type="text"
                    id="babyName"
                    value={data.name}
                    onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Sam"
                />
            </div>

            <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth (or Due Date)</label>
                <input
                    type="date"
                    id="dob"
                    value={data.dob}
                    onChange={e => setData(prev => ({ ...prev, dob: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            
            <div>
                <label htmlFor="healthInfo" className="block text-sm font-medium text-gray-700">Known health info (optional)</label>
                 <textarea
                    id="healthInfo"
                    value={data.healthInfo}
                    onChange={(e) => setData(prev => ({...prev, healthInfo: e.target.value}))}
                    placeholder="e.g., allergies, reflux, colic"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={2}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Disclaimer: Please consult a doctor for medical advice.</p>
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
                onClick={onFinish}
                disabled={!isFormValid}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400"
            >
                Finish & Create My Plan
            </button>
        </div>
    </div>
    );
};

export default BabyProfileStep;
