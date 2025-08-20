import React, { useState, useEffect } from 'react';
import { SUBSCRIPTION_PRICING } from '../constants';
import type { OnboardingData } from '../types';
import { trackAnalytics } from '../utils';

type BillingCycle = 'annual' | 'monthly';

interface SubscriptionModalProps {
  onClose: () => void;
  onSubscribe: (tier: 'solo' | 'duo', billingCycle: BillingCycle) => void;
  onboardingData: OnboardingData;
}

type PlanType = 'solo' | 'duo';

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose, onSubscribe, onboardingData }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('duo');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    // Intelligently select the default plan based on user's onboarding data
    if (onboardingData.partnerName) {
        setSelectedPlan('duo');
    } else {
        setSelectedPlan('solo');
    }
  }, [onboardingData]);


  const handleSubscribeClick = () => {
    trackAnalytics('subscribe_started', { tier: selectedPlan, billingCycle });
    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
        onSubscribe(selectedPlan, billingCycle);
        setIsSubscribing(false);
        onClose();
    }, 1500);
  };

  const getPrice = (plan: PlanType, cycle: BillingCycle) => {
      const key = `${plan}_${cycle}` as keyof typeof SUBSCRIPTION_PRICING;
      return SUBSCRIPTION_PRICING[key].price;
  }
  
  const planFeatures: Record<PlanType, string[]> = {
      solo: [
          "Daily next steps",
          "First-48 checklist",
          "Weekly recap + printable plan"
      ],
      duo: [
          "Everything in Solo",
          "Co-parent shift planner",
          "Private fairness view",
          "Share check-in summaries (optional)"
      ]
  };

  const PlanOption: React.FC<{
    id: PlanType;
    title: string;
  }> = ({ id, title }) => (
    <div
      onClick={() => setSelectedPlan(id)}
      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
        selectedPlan === id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
            <p className="font-bold text-lg text-indigo-900">{title}</p>
        </div>
         <div className="text-right">
            <span className="text-xl font-extrabold">R{getPrice(id, billingCycle)}</span>
            <span className="text-sm">/{billingCycle === 'annual' ? 'year' : 'month'}</span>
       </div>
      </div>
      <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
        {planFeatures[id].map(feature => <li key={feature}>{feature}</li>)}
      </ul>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => { trackAnalytics('cancel', { context: 'subscription_modal', reason: 'background_click' }); onClose(); }}>
      <div className="bg-white rounded-xl p-6 m-4 max-w-md w-full text-left shadow-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-900">Unlock premium</h2>
          <p className="text-gray-600 mt-2">Get your weekly plan & unlock the Postpartum Copilot.</p>
        </div>

        <div className="mt-6 flex justify-center bg-gray-100 rounded-full p-1">
            <button 
                onClick={() => setBillingCycle('annual')}
                className={`w-1/2 rounded-full py-1.5 text-sm font-semibold transition-colors ${billingCycle === 'annual' ? 'bg-white text-indigo-700 shadow' : 'text-gray-600'}`}
            >
                Annual <span className="text-yellow-600 font-bold">(save 2 months)</span>
            </button>
            <button 
                onClick={() => setBillingCycle('monthly')}
                className={`w-1/2 rounded-full py-1.5 text-sm font-semibold transition-colors ${billingCycle === 'monthly' ? 'bg-white text-indigo-700 shadow' : 'text-gray-600'}`}
            >
                Monthly
            </button>
        </div>

        <div className="mt-4 space-y-4">
            <PlanOption 
                id="solo"
                title="Solo"
            />
            <PlanOption 
                id="duo"
                title="Duo"
            />
        </div>

        <div className="mt-8">
            <button
                onClick={handleSubscribeClick}
                disabled={isSubscribing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-indigo-400 flex items-center justify-center"
            >
                {isSubscribing ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </>
                ) : `Start ${selectedPlan === 'duo' ? 'Duo' : 'Solo'}`}
            </button>
            <button
                onClick={() => { trackAnalytics('cancel', { context: 'subscription_modal', reason: 'stay_on_free' }); onClose(); }}
                className="w-full mt-3 text-center text-gray-600 hover:text-gray-800 font-semibold py-2"
            >
                Stay on Free
            </button>
        </div>
        <p className="text-xs text-center text-gray-500 mt-4">
            Prices in ZAR. Cancel anytime. No diagnoses.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionModal;