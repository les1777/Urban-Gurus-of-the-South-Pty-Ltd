import type { ScreenerQuestion, EPDSResult, EPDSScoreCategory } from '../types';

export const EPDS_QUESTIONS: ScreenerQuestion[] = [
  {
    id: 1,
    text: 'I have been able to laugh and see the funny side of things.',
    options: [
      { text: 'As much as I always could', value: 0 },
      { text: 'Not quite so much now', value: 1 },
      { text: 'Definitely not so much now', value: 2 },
      { text: 'Not at all', value: 3 },
    ],
  },
  {
    id: 2,
    text: 'I have looked forward with enjoyment to things.',
    options: [
      { text: 'As much as I ever did', value: 0 },
      { text: 'Rather less than I used to', value: 1 },
      { text: 'Definitely less than I used to', value: 2 },
      { text: 'Hardly at all', value: 3 },
    ],
  },
  {
    id: 3,
    text: 'I have blamed myself unnecessarily when things went wrong.',
    options: [
      { text: 'Yes, most of the time', value: 3 },
      { text: 'Yes, some of the time', value: 2 },
      { text: 'Not very often', value: 1 },
      { text: 'No, never', value: 0 },
    ],
  },
  {
    id: 4,
    text: 'I have been anxious or worried for no good reason.',
    options: [
      { text: 'No, not at all', value: 0 },
      { text: 'Hardly ever', value: 1 },
      { text: 'Yes, sometimes', value: 2 },
      { text: 'Yes, very often', value: 3 },
    ],
  },
  {
    id: 5,
    text: 'I have felt scared or panicky for no very good reason.',
    options: [
      { text: 'Yes, quite a lot', value: 3 },
      { text: 'Yes, sometimes', value: 2 },
      { text: 'No, not much', value: 1 },
      { text: 'No, not at all', value: 0 },
    ],
  },
  {
    id: 6,
    text: 'Things have been getting on top of me.',
    options: [
      { text: 'Yes, most of the time I haven’t been able to cope at all', value: 3 },
      { text: 'Yes, sometimes I haven’t been coping as well as usual', value: 2 },
      { text: 'No, most of the time I have coped quite well', value: 1 },
      { text: 'No, I have been coping as well as ever', value: 0 },
    ],
  },
  {
    id: 7,
    text: 'I have been so unhappy that I have had difficulty sleeping.',
    options: [
      { text: 'Yes, most of the time', value: 3 },
      { text: 'Yes, sometimes', value: 2 },
      { text: 'Not very often', value: 1 },
      { text: 'No, not at all', value: 0 },
    ],
  },
  {
    id: 8,
    text: 'I have felt sad or miserable.',
    options: [
      { text: 'Yes, most of the time', value: 3 },
      { text: 'Yes, quite often', value: 2 },
      { text: 'Not very often', value: 1 },
      { text: 'No, not at all', value: 0 },
    ],
  },
  {
    id: 9,
    text: 'I have been so unhappy that I have been crying.',
    options: [
      { text: 'Yes, most of the time', value: 3 },
      { text: 'Yes, quite often', value: 2 },
      { text: 'Only occasionally', value: 1 },
      { text: 'No, never', value: 0 },
    ],
  },
  {
    id: 10,
    text: 'The thought of harming myself has occurred to me.',
    options: [
      { text: 'Yes, quite often', value: 3 },
      { text: 'Sometimes', value: 2 },
      { text: 'Hardly ever', value: 1 },
      { text: 'Never', value: 0 },
    ],
  },
];

export const calculateEPDSScore = (answers: Record<number, number>): EPDSResult => {
  const score = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const hasSuicidalIdeation = (answers[10] || 0) > 0;

  let category: EPDSScoreCategory = 'low';
  if (score >= 13) {
    category = 'high'; // Often indicates probable depression
  } else if (score >= 10) {
    category = 'moderate'; // Possible depression
  }

  // Any suicidal ideation is a critical finding regardless of total score
  if (hasSuicidalIdeation) {
    category = 'severe'; 
  }

  return { score, category, hasSuicidalIdeation };
};
