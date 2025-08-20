
import React from 'react';
import { usePostpartum } from '../hooks/usePostpartum';

const CrisisHelpBar: React.FC = () => {
  const { setView } = usePostpartum();

  return (
    <div className="bg-yellow-50 border-t-4 border-yellow-300 p-4 mb-6 rounded-b-lg text-center -mx-6 -mt-6">
      <p className="text-yellow-900 font-semibold">
        If you feel unsafe or overwhelmed, get immediate help.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-3">
        <button
          onClick={() => setView('crisis')}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Call a local helpline
        </button>
        <a
          href="https://findahelpline.com/countries/za"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          See resources
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Parent Flow does not provide medical advice.
      </p>
    </div>
  );
};

export default CrisisHelpBar;
