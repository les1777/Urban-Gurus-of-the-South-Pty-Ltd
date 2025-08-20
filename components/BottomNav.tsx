import React from 'react';
import { POSTPARTUM_MODULE_ENABLED } from '../config/featureFlags';

type AppView = 'daily' | 'hub' | 'postpartum' | 'settings';

interface BottomNavProps {
  view: AppView;
  setView: (view: AppView) => void;
}

const NavButton: React.FC<{
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-500'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ view, setView }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-md flex justify-around items-center max-w-2xl mx-auto rounded-t-xl">
      <NavButton
        label="Daily Flow"
        icon="🧘"
        isActive={view === 'daily'}
        onClick={() => setView('daily')}
      />
      <NavButton
        label="Knowledge Hub"
        icon="💡"
        isActive={view === 'hub'}
        onClick={() => setView('hub')}
      />
      {POSTPARTUM_MODULE_ENABLED && (
        <NavButton
          label="Copilot"
          icon="❤️‍🩹"
          isActive={view === 'postpartum'}
          onClick={() => setView('postpartum')}
        />
      )}
      <NavButton
        label="Settings"
        icon="⚙️"
        isActive={view === 'settings'}
        onClick={() => setView('settings')}
      />
    </nav>
  );
};

export default BottomNav;