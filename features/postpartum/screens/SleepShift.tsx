import React, { useState } from 'react';
import { usePostpartum } from '../hooks/usePostpartum';
import type { OnboardingData, WeeklyShifts, DayShifts, ShiftName } from '../../../types';
import { trackAnalytics } from '../../../utils';

interface SleepShiftProps {
  onboardingData: OnboardingData;
  weeklyShifts: WeeklyShifts;
  setWeeklyShifts: React.Dispatch<React.SetStateAction<WeeklyShifts>>;
}

const shiftTimes: Record<ShiftName, string> = {
  Night: '22:00–02:00',
  Dawn: '02:00–06:00',
  Day: '06:00–18:00',
  Evening: '18:00–22:00',
};

// Generate days for the week starting from today
const getWeekDays = (): string[] => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  const week = ['Today', 'Tomorrow'];
  for (let i = 2; i < 7; i++) {
    week.push(days[(today + i) % 7]);
  }
  return week;
};

const weekDays = getWeekDays();
const emptyDay: DayShifts = {
    shifts: {
        Night: { assignment: null },
        Dawn: { assignment: null },
        Day: { assignment: null },
        Evening: { assignment: null },
    },
    note: '',
};

export const SleepShift: React.FC<SleepShiftProps> = ({ onboardingData, weeklyShifts, setWeeklyShifts }) => {
    const { setView } = usePostpartum();
    const [showToast, setShowToast] = useState(false);
    
    const parent1 = onboardingData.name;
    const parent2 = onboardingData.partnerName || 'Partner';

    const handleAssignShift = (day: string, shift: ShiftName, person: string) => {
        setWeeklyShifts(prev => {
            const dayShifts = prev[day] || emptyDay;
            const currentAssignment = dayShifts.shifts[shift].assignment;
            const newAssignment = currentAssignment === person ? null : person;

            if (newAssignment) { // A new person is assigned
                 trackAnalytics('shift_created', { day, shift, assignee: newAssignment });
            }
            
            return {
                ...prev,
                [day]: {
                    ...dayShifts,
                    shifts: {
                        ...dayShifts.shifts,
                        [shift]: {
                            assignment: newAssignment,
                        },
                    },
                },
            };
        });
    };

    const handleNoteChange = (day: string, note: string) => {
        setWeeklyShifts(prev => ({
            ...prev,
            [day]: {
                ...(prev[day] || emptyDay),
                note,
            },
        }));
    };

    const handleSave = () => {
        // In a real app, this would save to a backend.
        console.log('Shifts saved:', weeklyShifts);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };
    
    // Check if any shifts have been assigned to decide if the planner is "empty"
    const isEmpty = !Object.values(weeklyShifts).some(day =>
      Object.values(day.shifts).some(shift => shift.assignment)
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white py-2 px-5 rounded-full text-sm shadow-lg z-50 animate-fade-in-out">
                    Saved.
                </div>
            )}
             <style>{`
                @keyframes fade-in-out {
                    0%, 100% { opacity: 0; transform: translateY(20px) translateX(-50%); }
                    10%, 90% { opacity: 1; transform: translateY(0) translateX(-50%); }
                }
                .animate-fade-in-out {
                    animation: fade-in-out 3s ease-in-out forwards;
                }
            `}</style>

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-indigo-900">Weekly shifts</h2>
                <p className="text-gray-600 text-sm mt-1">
                    Block out who covers Night, Dawn, Day, Evening. You can swap any time.
                </p>
            </div>
            
            {isEmpty ? (
                 <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 mb-4">No shifts yet. Start with tonight.</p>
                    <button
                        onClick={() => handleAssignShift(weekDays[0], 'Night', parent1)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg text-sm"
                    >
                        Add First Shift
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {weekDays.map(day => (
                        <div key={day} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                             <h3 className="font-bold text-lg text-gray-800 mb-3">{day}</h3>
                             <div className="space-y-3">
                                {(Object.keys(shiftTimes) as ShiftName[]).map((shift) => (
                                    <div key={shift} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-700">{shift}</p>
                                            <p className="text-xs text-gray-500">{shiftTimes[shift]}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleAssignShift(day, shift, parent1)}
                                                className={`px-3 py-1 text-sm rounded-full border-2 transition-colors ${
                                                    weeklyShifts[day]?.shifts[shift]?.assignment === parent1
                                                    ? 'bg-blue-500 text-white border-blue-500'
                                                    : 'bg-white text-blue-700 border-gray-300 hover:bg-blue-50'
                                                }`}
                                            >
                                                {parent1.split(' ')[0]}
                                            </button>
                                            <button
                                                 onClick={() => handleAssignShift(day, shift, parent2)}
                                                 className={`px-3 py-1 text-sm rounded-full border-2 transition-colors ${
                                                     weeklyShifts[day]?.shifts[shift]?.assignment === parent2
                                                     ? 'bg-teal-500 text-white border-teal-500'
                                                     : 'bg-white text-teal-700 border-gray-300 hover:bg-teal-50'
                                                 }`}
                                            >
                                                {parent2.split(' ')[0]}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Optional note (e.g., bottles prepped, meds, admin)."
                                value={weeklyShifts[day]?.note || ''}
                                onChange={(e) => handleNoteChange(day, e.target.value)}
                                className="mt-4 w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    ))}
                </div>
            )}
            
            <p className="text-xs text-gray-500 mt-6 text-center italic">
                For guidance only. Not a diagnosis.
            </p>
            <div className="mt-4 flex items-center justify-end">
                <button
                    onClick={handleSave}
                    disabled={isEmpty}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-400"
                >
                    Save Shifts
                </button>
            </div>
        </div>
    );
};