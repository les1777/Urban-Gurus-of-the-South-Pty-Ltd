import { useContext } from 'react';
import { SafetyContext } from '../providers/SafetyProvider';
import type { SafetyContextType } from '../types';

export const useSafety = (): SafetyContextType => {
  const context = useContext(SafetyContext);
  if (context === undefined) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};
