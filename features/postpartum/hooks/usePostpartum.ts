import { useContext } from 'react';
import { PostpartumContext } from '../providers/PostpartumProvider';
import type { PostpartumContextType } from '../types';

export const usePostpartum = (): PostpartumContextType => {
  const context = useContext(PostpartumContext);
  if (context === undefined) {
    throw new Error('usePostpartum must be used within a PostpartumProvider');
  }
  return context;
};
