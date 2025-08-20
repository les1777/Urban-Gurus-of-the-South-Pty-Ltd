import React from 'react';

const PrivacyNotice: React.FC = () => {
  return (
    <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
      <p>
        <strong className="text-gray-700">Privacy Notice:</strong> Parent Flow protects your privacy. We collect account details, baby age (with competent person consent), and wellness check‑ins (with explicit consent) to personalise your daily plan. We do not sell data. We use secure cloud providers (some outside SA) with POPIA‑compliant safeguards. You can export your data, withdraw consent, or delete your account any time in Settings → Privacy. Direct marketing is opt‑in only. For details, read our full Privacy Policy and PAIA Manual or contact <a href="mailto:info@urbangurus.co.za" className="text-indigo-600 hover:underline">info@urbangurus.co.za</a>.
      </p>
    </div>
  );
};

export default PrivacyNotice;
