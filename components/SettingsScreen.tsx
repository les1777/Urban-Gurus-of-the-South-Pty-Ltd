import React, { useState } from 'react';
import type { OnboardingData } from '../types';

interface SettingsScreenProps {
  onboardingData: OnboardingData;
  onUpdateConsents: (newConsents: OnboardingData['consents']) => void;
  onDeleteAccount: () => void;
  onShowPrivacyPolicy: () => void;
}

const Toggle: React.FC<{
  id: keyof OnboardingData['consents'];
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

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onboardingData,
  onUpdateConsents,
  onDeleteAccount,
  onShowPrivacyPolicy,
}) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { consents } = onboardingData;

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target as { id: keyof OnboardingData['consents'], checked: boolean };
        
        // Prevent unchecking required consents
        if ((id === 'processChildInfo' || id === 'processHealthInfo') && !checked) {
            alert('This consent is required for the app to function and cannot be disabled.');
            return;
        }

        onUpdateConsents({ ...consents, [id]: checked });
    };

    const handleExport = () => {
        alert('Your data export has been requested. An email with a download link will be sent to you within 24 hours.');
    };

    const handleDelete = () => {
        onDeleteAccount();
        setShowDeleteConfirm(false);
    };

    const DeleteConfirmationModal = () => (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(false)}
        >
            <div 
                className="bg-white rounded-lg p-6 m-4 max-w-sm w-full text-center shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-red-800 mb-4">Are you absolutely sure?</h2>
                <p className="text-gray-600 mb-6 text-sm">
                    This action is irreversible. Your account and all associated data will be permanently deleted after a 30-day grace period for legal retention purposes.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
                    >
                        Cancel
                    </button>
                     <button
                        onClick={handleDelete}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
      {showDeleteConfirm && <DeleteConfirmationModal />}
      <div>
        <h2 className="text-xl font-bold text-indigo-900 mb-2">Privacy & data</h2>
        <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 border">
                <h3 className="font-semibold text-gray-800">Manage consent</h3>
                <p className="text-xs text-gray-500 mb-3">Last updated: {consents.lastUpdated}</p>
                <div className="space-y-3">
                     <Toggle
                        id="processChildInfo"
                        checked={consents.processChildInfo}
                        onChange={handleToggle}
                        label="Process Child's Information"
                        description="Required to personalize next steps based on baby's age."
                        disabled // This is a core functional consent, often not mutable after signup
                    />
                    <Toggle
                        id="processHealthInfo"
                        checked={consents.processHealthInfo}
                        onChange={handleToggle}
                        label="Process Health Information"
                        description="Required for wellness check-ins and safety resources."
                        disabled // This is a core functional consent
                    />
                    {onboardingData.partnerName && (
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
            </div>

            <div className="flex flex-col space-y-2">
                 <button onClick={handleExport} className="text-left w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border text-sm font-medium text-gray-700">
                    Export my data
                 </button>
                 <button onClick={onShowPrivacyPolicy} className="text-left w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border text-sm font-medium text-gray-700">
                    See Privacy Policy
                 </button>
                 <button onClick={() => setShowDeleteConfirm(true)} className="text-left w-full p-3 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 text-sm font-medium text-red-700">
                    Delete my account
                 </button>
            </div>
        </div>
      </div>
      <footer className="text-center text-xs text-gray-500 pt-4 border-t">
        <p>Information Officer: Lesley Mashiri</p>
        <a href="mailto:info@urbangurus.co.za" className="text-indigo-600 hover:underline">info@urbangurus.co.za</a>
      </footer>
    </div>
  );
};

export default SettingsScreen;