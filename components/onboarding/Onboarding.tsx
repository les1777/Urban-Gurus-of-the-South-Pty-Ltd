import React, { useState } from 'react';
import type { OnboardingData } from '../../types';
import WelcomeStep from './WelcomeStep';
import FamilyInfoStep from './FamilyInfoStep';
import ConsentStep from './ConsentStep';
import PrivacyPolicyModal from './PrivacyPolicyModal';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({
    name: '',
    partnerName: '',
    babyName: '',
    babyDob: '',
    consents: {
      processChildInfo: false,
      processHealthInfo: false,
      shareWithPartner: false,
      marketing: false,
      lastUpdated: '',
    },
  });

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleFinish = () => {
    // Type assertion because we know the data is complete at this point
    // based on form validation in child components.
    onComplete(onboardingData as OnboardingData);
  };

  const setConsents = (updater: (prev: OnboardingData['consents']) => OnboardingData['consents']) => {
    setOnboardingData((prev) => ({
      ...prev,
      consents: updater(prev.consents!),
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50">
      {showPrivacyModal && <PrivacyPolicyModal onClose={() => setShowPrivacyModal(false)} />}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-4 transition-all duration-500">
        {step === 1 && (
          <WelcomeStep onNext={handleNext} onShowPrivacy={() => setShowPrivacyModal(true)} />
        )}
        {step === 2 && (
          <FamilyInfoStep
            data={{
              name: onboardingData.name!,
              partnerName: onboardingData.partnerName!,
              babyName: onboardingData.babyName!,
              babyDob: onboardingData.babyDob!,
            }}
            setData={setOnboardingData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <ConsentStep
            consents={onboardingData.consents!}
            setConsents={setConsents}
            onFinish={handleFinish}
            onBack={handleBack}
            hasPartner={!!onboardingData.partnerName}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;