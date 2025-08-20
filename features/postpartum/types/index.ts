export interface Helpline {
  name: string;
  phone?: string;
  description: string;
  whatsapp?: string;
}

export interface ScreenerQuestion {
  id: number;
  text: string;
  options: { text: string; value: number }[];
}

export type EPDSScoreCategory = 'low' | 'moderate' | 'high' | 'severe';

export interface EPDSResult {
  score: number;
  category: EPDSScoreCategory;
  hasSuicidalIdeation: boolean;
}

export interface PostpartumState {
  view: 'hub' | 'screener' | 'screener_results' | 'sleep' | 'partner' | 'crisis';
  epdsAnswers: Record<number, number>;
  epdsResult: EPDSResult | null;
}

export interface PostpartumContextType extends PostpartumState {
  setView: (view: PostpartumState['view']) => void;
  setEpdsAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setEpdsResult: React.Dispatch<React.SetStateAction<EPDSResult | null>>;
  resetScreener: () => void;
}

export interface SafetyContextType {
  helplines: Helpline[];
  isLoading: boolean;
  error: string | null;
}