import React from 'react';
import { useSafety } from '../hooks/useSafety';
import { usePostpartum } from '../hooks/usePostpartum';
import { safetyCopy } from '../copy/safety.en-ZA';
import Spinner from '../../../components/Spinner';

export const Crisis: React.FC = () => {
    const { helplines, isLoading, error } = useSafety();
    const { setView } = usePostpartum();

    const CallButton: React.FC<{ phone: string }> = ({ phone }) => (
        <a href={`tel:${phone}`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
            Call Now
        </a>
    );

    const WhatsAppButton: React.FC<{ number: string }> = ({ number }) => (
         <a href={`https://wa.me/${number}`} target="_blank" rel="noopener noreferrer" className="bg-green-100 hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded-lg text-sm transition-colors">
            WhatsApp
        </a>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-800 text-center mb-2">{safetyCopy.CRISIS_HEADER}</h2>
            <p className="text-gray-600 text-center mb-6">{safetyCopy.CRISIS_INTRO}</p>

            {isLoading && <div className="flex justify-center my-8"><Spinner /></div>}
            
            {error && <p className="text-center text-red-600 bg-red-50 p-4 rounded-lg">{safetyCopy.HELPLINE_FETCH_ERROR}</p>}

            {!isLoading && !error && (
                 <div className="space-y-4">
                    {helplines.map((line) => (
                        <div key={line.name} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800">{line.name}</p>
                                <p className="text-sm text-gray-600">{line.description}</p>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                {line.whatsapp && <WhatsAppButton number={line.whatsapp} />}
                                {line.phone && <CallButton phone={line.phone} />}
                            </div>
                        </div>
                    ))}
                 </div>
            )}
           
        </div>
    );
};