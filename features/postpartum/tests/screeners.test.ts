// This environment doesn't have a test runner configured.
// To prevent TypeScript errors about missing Jest globals, we can declare them.
declare var describe: any;
declare var it: any;
declare var expect: any;

import { calculateEPDSScore, EPDS_QUESTIONS } from '../logic/screeners';

describe('EPDS Scorer', () => {
  it('should calculate a score of 0 for all "never" answers', () => {
    const answers: Record<number, number> = {};
    EPDS_QUESTIONS.forEach(q => {
        // Find the option with value 0
        const zeroValueOption = q.options.find(opt => opt.value === 0);
        if (zeroValueOption) {
            answers[q.id] = zeroValueOption.value;
        }
    });
    const result = calculateEPDSScore(answers);
    expect(result.score).toBe(0);
    expect(result.category).toBe('low');
    expect(result.hasSuicidalIdeation).toBe(false);
  });

  it('should calculate a moderate score correctly', () => {
    const answers = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 2, 7: 1, 8: 1, 9: 0, 10: 0 };
    const result = calculateEPDSScore(answers);
    expect(result.score).toBe(11);
    expect(result.category).toBe('moderate');
    expect(result.hasSuicidalIdeation).toBe(false);
  });

  it('should calculate a high score correctly', () => {
    const answers = { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 7: 1, 8: 2, 9: 1, 10: 0 };
    const result = calculateEPDSScore(answers);
    expect(result.score).toBe(15);
    expect(result.category).toBe('high');
    expect(result.hasSuicidalIdeation).toBe(false);
  });

  it('should flag suicidal ideation and set category to severe, regardless of score', () => {
    // A low score but with suicidal ideation
    const answers = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 1 };
    const result = calculateEPDSScore(answers);
    expect(result.score).toBe(1);
    expect(result.category).toBe('severe');
    expect(result.hasSuicidalIdeation).toBe(true);
  });

  it('should calculate the maximum possible score', () => {
     const answers: Record<number, number> = {};
     EPDS_QUESTIONS.forEach(q => { answers[q.id] = 3; });
     const result = calculateEPDSScore(answers);
     expect(result.score).toBe(30);
     expect(result.category).toBe('severe'); // High score + suicidal ideation
     expect(result.hasSuicidalIdeation).toBe(true);
  });
});
