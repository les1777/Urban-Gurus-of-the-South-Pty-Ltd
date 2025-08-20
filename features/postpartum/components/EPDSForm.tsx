
import React, { useState } from 'react';
import { EPDS_QUESTIONS, calculateEPDSScore } from '../logic/screeners';
import { usePostpartum } from '../hooks/usePostpartum';
import { safetyCopy } from '../copy/safety.en-ZA';
import CrisisHelpBar from './CrisisHelpBar';

export const EPDSForm: React.FC = () => {
  const { setView, epdsAnswers, setEpdsAnswers, setEpdsResult } = usePostpartum();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = EPDS_QUESTIONS[currentQuestionIndex];
  const totalQuestions = EPDS_QUESTIONS.length;

  const handleAnswerSelect = (value: number) => {
    const newAnswers = { ...epdsAnswers, [currentQuestion.id]: value };
    setEpdsAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question answered, calculate score and move to results
      const result = calculateEPDSScore(newAnswers);
      setEpdsResult(result);
      setView('screener_results');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <CrisisHelpBar />
      <div className="mb-6">
        <p className="text-sm text-gray-500 text-right font-medium">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-sm font-semibold text-gray-600 mb-2">In the past 7 days...</p>
        <h3 className="text-xl font-semibold text-gray-800">{currentQuestion.text}</h3>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswerSelect(option.value)}
            className="w-full text-left p-4 bg-gray-50 hover:bg-indigo-100 border-2 border-gray-200 hover:border-indigo-400 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {option.text}
          </button>
        ))}
      </div>
       <p className="text-xs text-center text-gray-500 mt-6 italic">
          {safetyCopy.DISCLAIMER_SCREENER_INTRO}
       </p>
    </div>
  );
};
