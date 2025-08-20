import React from 'react';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 m-4 max-w-md w-full text-left shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Privacy policy summary</h2>
        <div className="text-sm text-gray-600 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          <p>
            Parent Flow protects your privacy. We collect account details, baby age (with competent person
            consent), and wellness check‑ins (with explicit consent) to personalise your daily plan. We do not
            sell data. We use secure cloud providers (some outside SA) with POPIA‑compliant safeguards. You can
            export your data, withdraw consent, or delete your account any time in Settings → Privacy. Direct
            marketing is opt‑in only. For details, read our full Privacy Policy and PAIA Manual or contact{' '}
            <a href="mailto:info@urbangurus.co.za" className="text-indigo-600 hover:underline">
              info@urbangurus.co.za
            </a>
            .
          </p>
          <p>
            This is a summary. A link to the full policy and PAIA manual will be available in the app settings.
          </p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;