import React from 'react';
import { usePostpartum } from '../hooks/usePostpartum';

export const PartnerActions: React.FC = () => {
    const { setView } = usePostpartum();
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Partner action packs</h2>
            <p className="text-gray-600 mb-6">
                This feature is coming soon! It will provide lists of concrete actions your partner can take to support you.
            </p>
            <p className="text-xs text-gray-500 mt-6 text-center italic">
                For guidance only. Not a diagnosis.
            </p>
        </div>
    );
};