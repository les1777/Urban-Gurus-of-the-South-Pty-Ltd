import React from 'react';
import { usePostpartum } from '../hooks/usePostpartum';
import { uiCopy } from '../copy/ui.en-ZA';

interface HubCardProps {
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
  icon: string;
  color: 'indigo' | 'teal' | 'sky' | 'red';
}

const colorClasses = {
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-800', button: 'bg-indigo-500 hover:bg-indigo-600' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-800', button: 'bg-teal-500 hover:bg-teal-600' },
    sky: { bg: 'bg-sky-50', text: 'text-sky-800', button: 'bg-sky-500 hover:bg-sky-600' },
    red: { bg: 'bg-red-50', text: 'text-red-800', button: 'bg-red-500 hover:bg-red-600' },
}

const HubCard: React.FC<HubCardProps> = ({ title, description, cta, onClick, icon, color }) => {
    const colors = colorClasses[color];
    return (
        <div className={`${colors.bg} ${colors.text} p-5 rounded-lg shadow-sm`}>
            <div className="text-4xl mb-2">{icon}</div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm opacity-80 mt-1 mb-4">{description}</p>
            <button onClick={onClick} className={`${colors.button} text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors`}>
                {cta}
            </button>
        </div>
    );
};


export const PostpartumHub: React.FC = () => {
    const { setView } = usePostpartum();

    return (
        <>
            <div className="space-y-4">
                 <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-indigo-900">{uiCopy.HUB_TITLE}</h2>
                    <p className="text-gray-600">{uiCopy.HUB_DESCRIPTION}</p>
                </div>
                <HubCard
                    icon="❤️‍🩹"
                    title={uiCopy.SCREENER_CARD_TITLE}
                    description={uiCopy.SCREENER_CARD_DESCRIPTION}
                    cta={uiCopy.SCREENER_CARD_CTA}
                    onClick={() => setView('screener')}
                    color="indigo"
                />
                <HubCard
                    icon="😴"
                    title={uiCopy.SLEEP_CARD_TITLE}
                    description={uiCopy.SLEEP_CARD_DESCRIPTION}
                    cta={uiCopy.SLEEP_CARD_CTA}
                    onClick={() => setView('sleep')}
                    color="sky"
                />
                <HubCard
                    icon="🤝"
                    title={uiCopy.PARTNER_CARD_TITLE}
                    description={uiCopy.PARTNER_CARD_DESCRIPTION}
                    cta={uiCopy.PARTNER_CARD_CTA}
                    onClick={() => setView('partner')}
                    color="teal"
                />
                 <HubCard
                    icon="🆘"
                    title={uiCopy.CRISIS_CARD_TITLE}
                    description={uiCopy.CRISIS_CARD_DESCRIPTION}
                    cta={uiCopy.CRISIS_CARD_CTA}
                    onClick={() => setView('crisis')}
                    color="red"
                />
            </div>
            <p className="text-xs text-gray-500 mt-6 text-center italic">
                For guidance only. Not a diagnosis.
            </p>
        </>
    );
};