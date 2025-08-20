import React from 'react';
import type { OnboardingData } from '../../types';

interface ConsentStepProps {
  consents: OnboardingData['consents'];
  setConsents: (updater: (prev: OnboardingData['consents']) => OnboardingData['consents']) => void;
  onFinish: () => void;
  onBack: () => void;
  hasPartner: boolean;
}

type ConsentToggleKey = keyof Omit<OnboardingData['consents'], 'lastUpdated'>;

const Toggle: React.FC<{
  id: ConsentToggleKey;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: React.ReactNode;
  description: string;
  required?: boolean;
  disabled?: boolean;
}> = ({ id, checked, onChange, label, description, required, disabled }) => (
  <div
    className={`flex items-start space-x-3 p-4 rounded-lg border ${
      checked ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-200'
    } ${disabled ? 'opacity-50' : ''}`}
  >
    <input
      id={id}
      type="checkbox"
      className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-0.5"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <div className="flex-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

const ConsentStep: React.FC<ConsentStepProps> = ({ consents, setConsents, onFinish, onBack, hasPartner }) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target as { id: ConsentToggleKey, checked: boolean };
    setConsents((prev) => ({ ...prev, [id]: checked }));
  };

  const isFinishEnabled = consents.processChildInfo && consents.processHealthInfo;

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-4">Your privacy choices</h2>
      <p className="text-gray-600 mb-6">Please review and consent to the following.</p>

      <div className="space-y-3">
        <Toggle
          id="processChildInfo"
          checked={consents.processChildInfo}
          onChange={handleToggle}
          label="Process Child's Information"
          description="I am a competent person and consent to processing my child’s information (baby nickname and date of birth)."
          required
        />
        <Toggle
          id="processHealthInfo"
          checked={consents.processHealthInfo}
          onChange={handleToggle}
          label="Process Health Information"
          description="I consent to the processing of my health information (e.g., wellness check-ins) to show me non-diagnostic insights and safety resources."
          required
        />
        {hasPartner && (
          <Toggle
            id="shareWithPartner"
            checked={consents.shareWithPartner}
            onChange={handleToggle}
            label="Share Summaries with Co-parent"
            description="Share a summary of my check-ins with my co-parent."
          />
        )}
        <Toggle
          id="marketing"
          checked={consents.marketing}
          onChange={handleToggle}
          label="App Updates & Next Steps"
          description="Send me next steps and updates by email/WhatsApp."
        />
      </div>

      <p className="text-xs text-center text-gray-500 mt-6">You can change these any time in Settings → Privacy.</p>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800 font-semibold py-2 px-4 rounded-lg">
          Back
        </button>
        <button
          onClick={onFinish}
          disabled={!isFinishEnabled}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default ConsentStep;