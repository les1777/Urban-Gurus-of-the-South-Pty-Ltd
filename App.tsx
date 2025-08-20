import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { HabitBlock, OnboardingData, WeeklyShifts } from './types';
import AuthGate from './components/AuthGate';
import Onboarding from './components/onboarding/Onboarding';
import DailyFlow from './components/DailyFlow';
import KnowledgeHub from './components/KnowledgeHub';
import BottomNav from './components/BottomNav';
import Spinner from './components/Spinner';
import SubscriptionModal from './components/SubscriptionModal';
import SettingsScreen from './components/SettingsScreen';
import PrivacyPolicyModal from './components/onboarding/PrivacyPolicyModal';
import { calculateAgeInWeeks, trackAnalytics } from './utils';
import Header from './components/Header';


// Postpartum Copilot Imports
import { POSTPARTUM_MODULE_ENABLED } from './config/featureFlags';
import { PostpartumProvider, SafetyProvider } from './features/postpartum';
import { SafetyBanner } from './features/postpartum';
import { usePostpartum } from './features/postpartum/hooks/usePostpartum';
import { PostpartumHub } from './features/postpartum/screens/PostpartumHub';
import { OnboardingScreener } from './features/postpartum/screens/OnboardingScreener';
import { SleepShift } from './features/postpartum/screens/SleepShift';
import { PartnerActions } from './features/postpartum/screens/PartnerActions';
import { Crisis } from './features/postpartum/screens/Crisis';

type AppView = 'daily' | 'hub' | 'postpartum' | 'settings';
export type SubscriptionTier = 'none' | 'solo' | 'duo';

interface User {
  name: string;
  email: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [blocks, setBlocks] = useState<HabitBlock[]>([]);
  const [loadingHabits, setLoadingHabits] = useState(false);
  const [view, setView] = useState<AppView>('daily');
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('none');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [weeklyShifts, setWeeklyShifts] = useState<WeeklyShifts>({});

  const postpartumCtx = POSTPARTUM_MODULE_ENABLED ? usePostpartum() : null;

  useEffect(() => {
    if (showSubscriptionModal) {
      trackAnalytics('paywall_viewed');
    }
  }, [showSubscriptionModal]);

  const handleLogin = () => {
    setUser({ name: "Demo User", email: "user@example.com" });
  };

  const handleSubscribe = (tier: 'solo' | 'duo', billingCycle: 'annual' | 'monthly') => {
    console.log(`Simulating subscription success for ${tier} tier!`);
    trackAnalytics('subscribe_completed', { tier, billingCycle });
    setSubscriptionTier(tier);
  };

  const generatePersonalizedHabits = async (data: OnboardingData) => {
    setLoadingHabits(true);
    try {
      const prompt = `
        Based on this new parent's profile, create a personalized daily plan with 3-4 habit blocks.
        The plan should be supportive, gentle, and actionable for a new parent.
        
        Parent Profile:
        - Name: ${data.name}
        - Co-parenting with: ${data.partnerName ? data.partnerName : 'Parenting solo'}

        Baby Profile:
        - Nickname: ${data.babyName}
        - Date of Birth: ${data.babyDob}

        Generate a JSON array of habit blocks. Each block must have a unique id (e.g., "block-1"), title, time suggestion, an array of 2-4 simple tasks, and an array of 1-2 helpful suggestions.
        The title should be in sentence case.
        ${data.partnerName ? 'Include at least one task or suggestion related to co-parenting or partner connection.' : ''}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                time: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['id', 'title', 'time', 'tasks', 'suggestions'],
            },
          },
        }
      });
      
      const generatedBlocks = JSON.parse(response.text);
      setBlocks(generatedBlocks);

    } catch (error) {
      console.error("Error generating habits:", error);
      // Fallback to some default habits if API fails
      setBlocks([
        { id: 'fallback-1', title: 'Moment of Calm', time: 'Anytime', tasks: ['Take 5 deep breaths'], suggestions: ['Try this when feeling overwhelmed'] }
      ]);
    } finally {
      setLoadingHabits(false);
    }
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    const dataWithTimestamp = {
        ...data,
        consents: {
            ...data.consents,
            lastUpdated: new Date().toLocaleDateString()
        }
    };
    setOnboardingData(dataWithTimestamp);
    generatePersonalizedHabits(dataWithTimestamp);
    trackAnalytics('onboarding_complete', { hasPartner: !!data.partnerName });
    if (data.partnerName) {
        trackAnalytics('partner_invited', { method: 'onboarding' });
    }
  };

  const handleUpdateConsents = (newConsents: OnboardingData['consents']) => {
    if (onboardingData) {
        setOnboardingData({
            ...onboardingData,
            consents: {
                ...newConsents,
                lastUpdated: new Date().toLocaleDateString(),
            }
        });
    }
  };

  const handleDeleteAccount = () => {
    // In a real app, this would trigger a backend process.
    // Here, we'll just reset the state to simulate logging out and deleting data.
    console.log("Simulating account deletion...");
    setUser(null);
    setOnboardingData(null);
    setBlocks([]);
    setSubscriptionTier('none');
    setWeeklyShifts({});
    setView('daily');
  };

  const handleViewChange = (newView: AppView) => {
    if (newView === 'postpartum' && subscriptionTier === 'none') {
        setShowSubscriptionModal(true);
    } else {
        setView(newView);
    }
  };

  const handleScheduleShifts = () => {
    if (subscriptionTier === 'none') {
        setShowSubscriptionModal(true);
    } else if (postpartumCtx) {
        setView('postpartum');
        postpartumCtx.setView('sleep');
    }
  };
  
  if (!user) {
    return <AuthGate onLogin={handleLogin} />;
  }

  if (!onboardingData) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }
  
  const babyAgeInWeeks = calculateAgeInWeeks(onboardingData.babyDob);

  const getHeaderText = () => {
      switch(view) {
          case 'daily':
              return (
                  <>
                      A mindful flow for you, {onboardingData.name}.
                      {babyAgeInWeeks > 0 && <span className="block text-sm text-indigo-600 mt-1">Today ({onboardingData.babyName} is {babyAgeInWeeks} weeks)</span>}
                  </>
              );
          case 'hub':
              return 'Your on-demand knowledge hub';
          case 'settings':
              return 'Settings';
          case 'postpartum':
              return 'Your postpartum copilot';
          default:
              return '';
      }
  }
  
  const showBackButton = POSTPARTUM_MODULE_ENABLED && view === 'postpartum' && postpartumCtx && postpartumCtx.view !== 'hub';
  const handleBack = () => {
      if (showBackButton && postpartumCtx) {
          postpartumCtx.setView('hub');
      }
  };


  return (
    <div className="min-h-screen bg-stone-50">
       {showSubscriptionModal && <SubscriptionModal 
            onClose={() => setShowSubscriptionModal(false)}
            onSubscribe={handleSubscribe}
            onboardingData={onboardingData}
        />}
        {showPrivacyPolicyModal && <PrivacyPolicyModal onClose={() => setShowPrivacyPolicyModal(false)} />}
       {POSTPARTUM_MODULE_ENABLED && subscriptionTier !== 'none' && <SafetyBanner />}
      <div className="max-w-2xl mx-auto p-4 sm:p-6 pb-24">
        <Header 
            title={getHeaderText()}
            onBack={showBackButton ? handleBack : undefined}
        />

        <main>
          {view === 'daily' && (
             loadingHabits ? <div className="flex justify-center items-center h-64"><Spinner /></div> : <DailyFlow blocks={blocks} setBlocks={setBlocks} onboardingData={onboardingData} subscriptionTier={subscriptionTier} onShowSubscriptionModal={() => setShowSubscriptionModal(true)} onScheduleShifts={handleScheduleShifts} weeklyShifts={weeklyShifts} onNavigateToHub={() => setView('hub')} />
          )}
          {view === 'hub' && <KnowledgeHub />}
          {view === 'settings' && (
              <SettingsScreen 
                onboardingData={onboardingData}
                onUpdateConsents={handleUpdateConsents}
                onDeleteAccount={handleDeleteAccount}
                onShowPrivacyPolicy={() => setShowPrivacyPolicyModal(true)}
              />
          )}
          {POSTPARTUM_MODULE_ENABLED && view === 'postpartum' && <PostpartumController onboardingData={onboardingData} weeklyShifts={weeklyShifts} setWeeklyShifts={setWeeklyShifts} />}
        </main>
      </div>
      <BottomNav view={view} setView={handleViewChange} />
    </div>
  );
}

export default function App() {
  // The providers are needed for the Copilot feature, which is now behind a subscription.
  // We render them if the feature *could* be enabled, and the app logic will handle access.
  if (POSTPARTUM_MODULE_ENABLED) {
    return (
      <SafetyProvider>
        <PostpartumProvider>
          <AppContent />
        </PostpartumProvider>
      </SafetyProvider>
    );
  }
  return <AppContent />;
}

// Create a controller to render the correct postpartum screen
interface PostpartumControllerProps {
    onboardingData: OnboardingData;
    weeklyShifts: WeeklyShifts;
    setWeeklyShifts: React.Dispatch<React.SetStateAction<WeeklyShifts>>;
}
const PostpartumController: React.FC<PostpartumControllerProps> = ({ onboardingData, weeklyShifts, setWeeklyShifts }) => {
    const { view } = usePostpartum();

    switch (view) {
        case 'hub':
            return <PostpartumHub />;
        case 'screener':
        case 'screener_results':
            return <OnboardingScreener />;
        case 'sleep':
            return <SleepShift onboardingData={onboardingData} weeklyShifts={weeklyShifts} setWeeklyShifts={setWeeklyShifts} />;
        case 'partner':
            return <PartnerActions />;
        case 'crisis':
            return <Crisis />;
        default:
            return <PostpartumHub />;
    }
}