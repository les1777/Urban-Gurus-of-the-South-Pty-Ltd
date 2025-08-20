import React, { createContext, useState } from 'react';
import type { PostpartumContextType, PostpartumState, EPDSResult } from '../types';

export const PostpartumContext = createContext<PostpartumContextType | undefined>(undefined);

const initialState: PostpartumState = {
  view: 'hub',
  epdsAnswers: {},
  epdsResult: null,
};

export const PostpartumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<PostpartumState['view']>(initialState.view);
  const [epdsAnswers, setEpdsAnswers] = useState<Record<number, number>>(initialState.epdsAnswers);
  const [epdsResult, setEpdsResult] = useState<EPDSResult | null>(initialState.epdsResult);

  const resetScreener = () => {
    setEpdsAnswers({});
    setEpdsResult(null);
    setView('hub');
  };

  const value = {
    view,
    setView,
    epdsAnswers,
    setEpdsAnswers,
    epdsResult,
    setEpdsResult,
    resetScreener,
  };

  return <PostpartumContext.Provider value={value}>{children}</PostpartumContext.Provider>;
};
