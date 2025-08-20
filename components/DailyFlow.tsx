import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import type { HabitBlock, OnboardingData, WeeklyShifts, ShiftName } from '../types';
import type { SubscriptionTier } from '../App';
import LindyQuote from './LindyQuote';
import StreakCounter from './StreakCounter';
import SummaryDashboard from './SummaryDashboard';
import HabitCard from './HabitCard';
import PartnerReflectionCard from './PartnerReflectionCard';
import CoParentTracker from './CoParentTracker';
import GoodEnoughButton from './GoodEnoughButton';
import WeeklyPlanModal from './WeeklyPlanModal';
import Spinner from './Spinner';
import { GoogleGenAI } from "@google/genai";
import { trackAnalytics } from '../utils';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


type TaskID = 'shift' | 'cue' | 'contact';
type Tasks = Record<TaskID, boolean>;

interface First48HoursCardProps {
  tasks: Tasks;
  onToggleTask: (taskId: TaskID) => void;
  onScheduleShifts: () => void;
}

const checklistItems: { id: TaskID; label: string }[] = [
    { id: 'shift', label: 'Set one overnight shift each (who’s on call from 22:00–02:00).' },
    { id: 'cue', label: 'Choose a calm cue for baby (same song/same light).' },
    { id: 'contact', label: 'Save one “help” contact (midwife/clinic).' }
];

const First48HoursCard: React.FC<First48HoursCardProps> = ({ tasks, onToggleTask, onScheduleShifts }) => {
  return (
    <div className="bg-white p-5 rounded-lg soft-shadow mb-6 border-l-4 border-indigo-400">
      <h3 className="text-xl font-bold text-indigo-900">First 48 hours</h3>
      <p className="text-sm text-gray-500 mb-4">Three tiny wins to get momentum.</p>

      <ul className="space-y-3 mb-5">
        {checklistItems.map((item) => (
          <li key={item.id} className="flex items-start">
            <input
              id={`task-${item.id}`}
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer mt-0.5"
              checked={tasks[item.id]}
              onChange={() => onToggleTask(item.id)}
            />
            <label htmlFor={`task-${item.id}`} className="ml-3 text-stone-700">
              {item.label}
            </label>
          </li>
        ))}
      </ul>
      
      <button
        onClick={onScheduleShifts}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Schedule partner shifts
      </button>
    </div>
  );
};

interface HouseholdFairnessCardProps {
  onHide: () => void;
}

const HouseholdFairnessCard: React.FC<HouseholdFairnessCardProps> = ({ onHide }) => {
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    trackAnalytics('fairness_viewed');
  }, []);

  const handleToggle = () => {
    setIsToggled(true);
    trackAnalytics('fairness_optout');
    // Add a small delay so the user can see the toggle animation before it disappears
    setTimeout(onHide, 300);
  };

  return (
    <div className="bg-violet-50 p-5 rounded-lg mb-6 text-violet-900 border-l-4 border-violet-400">
      <h4 className="font-bold text-lg mb-2">How we’re sharing care</h4>
      <p className="text-sm mb-4">
        A private view of completed blocks and admin tasks. Use it to talk, not to tally.
      </p>
      <button className="text-violet-600 font-semibold hover:underline text-sm mb-4">
        See details
      </button>
      
      <div className="mt-2 pt-4 border-t border-violet-200">
        <div className="flex items-center justify-between">
            <label htmlFor="hide-fairness-toggle" className="text-sm flex-1 cursor-pointer">
              Hide fairness view for this household.
            </label>
            <div className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    id="hide-fairness-toggle"
                    className="sr-only peer"
                    checked={isToggled}
                    onChange={handleToggle}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-violet-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
            </div>
        </div>
      </div>
      
      <p className="text-xs text-violet-700/80 mt-4 italic text-center">
        This is guidance, not a scorecard.
      </p>
    </div>
  );
};

interface WeeklyRecapCardProps {
  sharedTasksDone: number;
  topCue: string;
  suggestion: string;
  isLoadingSuggestion: boolean;
  onPrintPlan: () => void;
  onEditShifts: () => void;
  isLocked: boolean;
  onUnlock: () => void;
}

const WeeklyRecapCard: React.FC<WeeklyRecapCardProps> = ({
  sharedTasksDone,
  topCue,
  suggestion,
  isLoadingSuggestion,
  onPrintPlan,
  onEditShifts,
  isLocked,
  onUnlock,
}) => {
  const CardContent = () => (
     <>
        <h3 className="text-xl font-bold text-teal-900">Your week at a glance</h3>
        <ul className="my-4 space-y-2 text-stone-700">
            <li className="flex items-center">
            <span className="text-lg mr-2">🤝</span>
            Shared tasks done: <span className="font-bold ml-1">{sharedTasksDone}</span>
            </li>
            <li className="flex items-center">
            <span className="text-lg mr-2">🎶</span>
            Most helpful cue: <span className="font-bold ml-1">{topCue}</span>
            </li>
            <li className="flex items-start">
            <span className="text-lg mr-2 mt-0.5">💡</span>
            <span>
                One tweak to try:{' '}
                {isLoadingSuggestion ? (
                <span className="inline-block ml-2"><Spinner /></span>
                ) : (
                <span className="font-bold ml-1 italic">"{suggestion}"</span>
                )}
            </span>
            </li>
        </ul>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
            onClick={onPrintPlan}
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
            Print A4 plan
            </button>
            <button
            onClick={onEditShifts}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
            Edit shifts
            </button>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center italic">
            For guidance only. Not a diagnosis.
        </p>
     </>
  );

  if (isLocked) {
      return (
         <div className="bg-white p-5 rounded-lg soft-shadow mb-6 border-l-4 border-teal-400 relative overflow-hidden">
            <div className="blur-sm pointer-events-none">
                <CardContent />
            </div>
            <div className="absolute inset-0 bg-stone-100/80 flex flex-col items-center justify-center text-center p-4">
                <div className="text-3xl mb-2">✨</div>
                <h4 className="font-bold text-lg text-stone-800">Unlock your weekly recap</h4>
                <p className="text-sm text-stone-600 mb-4">Get AI-powered suggestions and a printable plan to share.</p>
                <button
                onClick={onUnlock}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                Unlock Premium
                </button>
            </div>
         </div>
      );
  }

  return (
    <div className="bg-white p-5 rounded-lg soft-shadow mb-6 border-l-4 border-teal-400">
      <CardContent />
    </div>
  );
};

const AskGuruCard: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-white p-5 rounded-lg soft-shadow border border-gray-100 mb-6">
      <div className="flex items-center space-x-4">
        <div className="text-4xl">💡</div>
        <div>
          <h4 className="font-bold text-lg text-stone-800">Have a question?</h4>
          <p className="text-sm text-stone-600 mt-1">
            Ask our AI Guru about sleep, feeding, and more.
          </p>
        </div>
      </div>
      <button
        onClick={onNavigate}
        className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Ask Guru
      </button>
    </div>
  );
};


interface DailyFlowProps {
    blocks: HabitBlock[];
    setBlocks: React.Dispatch<React.SetStateAction<HabitBlock[]>>;
    onboardingData: OnboardingData;
    subscriptionTier: SubscriptionTier;
    onShowSubscriptionModal: () => void;
    onScheduleShifts: () => void;
    weeklyShifts: WeeklyShifts;
    onNavigateToHub: () => void;
}

const getWeekDays = (): string[] => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  const week = ['Today', 'Tomorrow'];
  for (let i = 2; i < 7; i++) {
    week.push(days[(today + i) % 7]);
  }
  return week;
};
const shiftTimes: Record<ShiftName, string> = {
  Night: '22:00–02:00',
  Dawn: '02:00–06:00',
  Day: '06:00–18:00',
  Evening: '18:00–22:00',
};


const DailyFlow: React.FC<DailyFlowProps> = ({ blocks, setBlocks, onboardingData, subscriptionTier, onShowSubscriptionModal, onScheduleShifts, weeklyShifts, onNavigateToHub }) => {
    const [streakCount, setStreakCount] = useState<number>(0);
    const [completedBlocks, setCompletedBlocks] = useState<string[]>([]);
    const [showGoodEnoughModal, setShowGoodEnoughModal] = useState(false);
    const [showWeeklyPlanModal, setShowWeeklyPlanModal] = useState(false);
    const [showFairnessCard, setShowFairnessCard] = useState(true);
    const [suggestion, setSuggestion] = useState('');
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(true);
    const [first48Tasks, setFirst48Tasks] = useState<Tasks>({
        shift: false,
        cue: false,
        contact: false,
    });

    useEffect(() => {
        const generateSuggestion = async () => {
            if (!onboardingData.partnerName) {
                setIsLoadingSuggestion(false);
                setSuggestion("Take a few moments for yourself whenever you can.");
                return;
            }
            setIsLoadingSuggestion(true);
            try {
                const prompt = `
                    A new parent named ${onboardingData.name} is using a habit tracking app with their co-parent, ${onboardingData.partnerName}.
                    This week, they completed ${completedBlocks.length} out of ${blocks.length} planned tasks.
                    Based on this, provide one gentle, actionable suggestion or 'tweak' for them to try next week to improve their co-parenting or wellbeing.
                    The suggestion must be a single, encouraging sentence. Do not add any preamble or extra text.
                    Example: "Try adding a 5-minute 'check-in' chat with your partner before the evening shift to sync up."
                `;
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });
                setSuggestion(response.text.trim());
            } catch (error) {
                console.error("Error generating suggestion:", error);
                setSuggestion("Take a few moments for yourself whenever you can."); // Fallback
            } finally {
                setIsLoadingSuggestion(false);
            }
        };

        if (blocks.length > 0) {
             generateSuggestion();
        } else {
            setIsLoadingSuggestion(false);
            setSuggestion("Start by adding a small, achievable goal for tomorrow.");
        }
    }, [blocks.length, completedBlocks.length, onboardingData]);


    const handleToggleFirst48Task = (taskId: TaskID) => {
        // Only track when checking the box (moving from false to true)
        if (!first48Tasks[taskId]) {
            trackAnalytics('first48_step_completed', { stepId: taskId });
        }
        setFirst48Tasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
    };
    
    const showFirst48Card = !Object.values(first48Tasks).every(Boolean);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(blocks);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setBlocks(items);
    };

    const updateStatus = (blockId: string, isComplete: boolean) => {
        setCompletedBlocks((prev) => {
            const wasCompleted = prev.includes(blockId);
            if (isComplete && !wasCompleted) {
                setStreakCount(c => c + 1);
                return [...prev, blockId];
            } else if (!isComplete && wasCompleted) {
                setStreakCount(c => c > 0 ? c - 1 : 0);
                return prev.filter(id => id !== blockId);
            }
            return prev;
        });
    };
    
    const handlePrintPlan = () => {
        trackAnalytics('plan_printed', { source: 'weekly_recap_card' });
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Please allow pop-ups to print your plan.');
            return;
        }

        const weekOf = new Date().toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const weekDays = getWeekDays();
        
        const shiftsHtml = weekDays.map(day => {
            const dayShifts = weeklyShifts[day];
            if (!dayShifts) return `
                <div class="day-card">
                    <h3>${day}</h3>
                    <p class="no-shifts">No shifts planned.</p>
                </div>
            `;

            return `
                <div class="day-card">
                    <h3>${day}</h3>
                    <div class="shifts">
                        ${(Object.keys(shiftTimes) as ShiftName[]).map(shiftName => `
                            <div class="shift">
                                <div class="shift-time">
                                    <strong>${shiftName}</strong>
                                    <small>${shiftTimes[shiftName]}</small>
                                </div>
                                <div class="shift-person">${dayShifts.shifts[shiftName].assignment || 'Unassigned'}</div>
                            </div>
                        `).join('')}
                    </div>
                    ${dayShifts.note ? `<div class="note"><strong>Note:</strong> ${dayShifts.note}</div>` : ''}
                </div>
            `;
        }).join('');

        const printContent = `
            <html>
                <head>
                    <title>Parent Flow - Week of ${weekOf}</title>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 20px; color: #333; }
                        header, footer { text-align: center; }
                        header h1 { color: #4338ca; }
                        .plan-container { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                        .day-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; break-inside: avoid; }
                        .day-card h3 { margin: 0 0 10px; color: #4f46e5; }
                        .shifts { display: flex; flex-direction: column; gap: 8px; }
                        .shift { display: flex; justify-content: space-between; align-items: center; padding: 5px; background-color: #f4f4f5; border-radius: 4px; }
                        .shift-time small { color: #6b7280; }
                        .shift-person { font-weight: bold; color: #166534; }
                        .no-shifts { color: #6b7280; font-style: italic; }
                        .note { margin-top: 10px; font-size: 0.9em; color: #3f3f46; background-color: #fafafa; padding: 8px; border-radius: 4px; }
                        .suggestion-box { grid-column: 1 / -1; margin-top: 20px; padding: 15px; background-color: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 8px; }
                        .suggestion-box strong { color: #115e59; }
                        footer { margin-top: 20px; font-size: 0.8em; color: #6b7280; }
                    </style>
                </head>
                <body>
                    <header>
                        <h1>Parent Flow</h1>
                        <h2>Week of ${weekOf}</h2>
                    </header>
                    <main>
                        <div class="plan-container">
                            ${shiftsHtml}
                            <div class="suggestion-box">
                                <strong>💡 One tweak to try:</strong> "${suggestion}"
                            </div>
                        </div>
                    </main>
                    <footer>
                        <p>For guidance only. Not a diagnosis.</p>
                    </footer>
                </body>
            </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    const GoodEnoughModal = () => (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowGoodEnoughModal(false)}
        >
            <div 
                className="bg-white rounded-lg p-8 m-4 max-w-sm text-center shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-indigo-800 mb-4">You are enough.</h2>
                <p className="text-gray-600 mb-6">
                    Taking care of a baby is hard work. Rest is not a reward, it's a necessity. The laundry can wait. You've done beautifully today.
                </p>
                <button
                    onClick={() => setShowGoodEnoughModal(false)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                >
                    Thank You
                </button>
            </div>
        </div>
    );

    return (
        <>
            {showGoodEnoughModal && <GoodEnoughModal />}
            {showWeeklyPlanModal && <WeeklyPlanModal onClose={() => setShowWeeklyPlanModal(false)} onboardingData={onboardingData} />}
            
            <LindyQuote />
            <StreakCounter count={streakCount} />
            <SummaryDashboard completedCount={completedBlocks.length} totalCount={blocks.length} />

            {showFirst48Card && (
                <First48HoursCard 
                    tasks={first48Tasks}
                    onToggleTask={handleToggleFirst48Task}
                    onScheduleShifts={onScheduleShifts}
                />
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="day-plan">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                    {blocks.map((block, index) => (
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                        {(providedDraggable) => (
                            <HabitCard
                            block={block}
                            provided={providedDraggable}
                            isCompleted={completedBlocks.includes(block.id)}
                            updateStatus={updateStatus}
                            />
                        )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>

            {onboardingData.partnerName && (
                <WeeklyRecapCard
                    isLocked={subscriptionTier === 'none'}
                    onUnlock={onShowSubscriptionModal}
                    sharedTasksDone={Math.floor(completedBlocks.length * 0.8)} // Simulated data
                    topCue='Playing "Here Comes The Sun"' // Simulated data
                    suggestion={suggestion}
                    isLoadingSuggestion={isLoadingSuggestion}
                    onPrintPlan={handlePrintPlan}
                    onEditShifts={onScheduleShifts}
                 />
            )}
            
            {onboardingData.partnerName && showFairnessCard && (
                <HouseholdFairnessCard onHide={() => setShowFairnessCard(false)} />
            )}

            <AskGuruCard onNavigate={onNavigateToHub} />

            <PartnerReflectionCard />
            <CoParentTracker />

            <GoodEnoughButton onClick={() => setShowGoodEnoughModal(true)} />
        </>
    );
};

export default DailyFlow;