
import React from 'react';
import { EPDSForm } from '../components/EPDSForm';
import { usePostpartum } from '../hooks/usePostpartum';
import { safetyCopy } from '../copy/safety.en-ZA';
import CrisisHelpBar from '../components/CrisisHelpBar';

const ResultsDisplay: React.FC = () => {
  const { epdsResult, resetScreener, setView } = usePostpartum();

  if (!epdsResult) return null;

  const { score, category, hasSuicidalIdeation } = epdsResult;

  const resultInfo = {
    low: {
      title: 'Thank you for checking in.',
      message: 'Your score is in the lower range. It\'s still important to monitor your feelings and practice self-care. Keep checking in with yourself.',
      color: 'bg-green-100 text-green-800',
    },
    moderate: {
      title: 'It may be helpful to talk to someone.',
      message: 'Your score suggests you may be experiencing symptoms of distress. It could be beneficial to share these results with a partner, friend, or healthcare professional.',
      color: 'bg-yellow-100 text-yellow-800',
    },
    high: {
      title: 'We strongly recommend seeking support.',
      message: 'Your score is in a range that suggests a high likelihood of depression. Please share these results with a doctor or mental health professional to discuss next steps.',
      color: 'bg-orange-100 text-orange-800',
    },
    severe: {
      title: 'Your safety is the highest priority.',
      message: 'You have indicated thoughts of self-harm. It is very important to talk to someone right away. Please use the resources below to get immediate support.',
      color: 'bg-red-100 text-red-800',
    },
  };

  const info = resultInfo[category];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <CrisisHelpBar />
      <div className={`${info.color} p-4 rounded-lg mb-4`}>
        <h3 className="text-xl font-bold">{info.title}</h3>
        <p className="mt-2 text-sm">{info.message}</p>
      </div>
      <p className="text-gray-600">Your score: <span className="font-bold">{score} / 30</span></p>
      
      {hasSuicidalIdeation && (
        <button
            onClick={() => setView('crisis')}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg"
        >
            Find Immediate Support
        </button>
      )}

      <p className="text-xs text-gray-500 mt-6 italic">{safetyCopy.DISCLAIMER_SCREENER_RESULTS}</p>

      <button
        onClick={resetScreener}
        className="mt-4 text-indigo-600 hover:text-indigo-800 font-semibold"
      >
        Done
      </button>
    </div>
  );
};


export const OnboardingScreener: React.FC = () => {
  const { view } = usePostpartum();
  
  return view === 'screener_results' ? <ResultsDisplay /> : <EPDSForm />;
};
