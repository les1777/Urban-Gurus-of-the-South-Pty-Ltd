export interface HabitBlock {
  id: string;
  title: string;
  time: string;
  tasks: string[];
  suggestions: string[];
}

export interface OnboardingData {
  name: string;
  partnerName: string;
  babyName: string;
  babyDob: string;
  consents: {
    processChildInfo: boolean;
    processHealthInfo: boolean;
    shareWithPartner: boolean;
    marketing: boolean;
    lastUpdated: string;
  };
}

export interface ParentProfile {
  name: string;
  parentingSetup: string;
  parentingStyle: string;
  concerns: string[];
}

export interface BabyProfile {
  name: string;
  dob: string;
  healthInfo: string;
}

// Types for the Sleep Shift Planner
export type ShiftName = 'Night' | 'Dawn' | 'Day' | 'Evening';

export interface ShiftData {
  assignment: string | null;
}
export interface DayShifts {
  shifts: Record<ShiftName, ShiftData>;
  note: string;
}
export type WeeklyShifts = Record<string, DayShifts>;