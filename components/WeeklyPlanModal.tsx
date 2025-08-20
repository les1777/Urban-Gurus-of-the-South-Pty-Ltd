import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { OnboardingData } from '../types';
import Spinner from './Spinner';
import { trackAnalytics } from '../utils';

interface WeeklyPlanModalProps {
  onClose: () => void;
  onboardingData: OnboardingData;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const WeeklyPlanModal: React.FC<WeeklyPlanModalProps> = ({ onClose, onboardingData }) => {
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generatePlan = async () => {
      try {
        const prompt = `
          Based on the following parent and baby profile, create a simple, supportive, one-week plan.
          The parent's name is ${onboardingData.name}. ${onboardingData.partnerName ? `They are co-parenting with ${onboardingData.partnerName}.` : ''}
          The baby's nickname is ${onboardingData.babyName} and was born on ${onboardingData.babyDob}.
          The plan should include:
          1. Key developmental information for the baby's current age.
          2. A short list of suggested parent-baby activities for the week.
          3. Simple tracking points for the week (e.g., "Track daily nap durations").
          Format the response as clear, readable text. Use headings for each section.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        setPlan(response.text);
      } catch (error) {
        console.error("Error generating weekly plan:", error);
        setPlan("Something went wrong. Try again.");
      } finally {
        setIsLoading(false);
      }
    };
    generatePlan();
  }, [onboardingData]);

  const handlePrint = () => {
    trackAnalytics('plan_printed', { source: 'weekly_plan_modal' });
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Your weekly plan</title>');
      printWindow.document.write('<style>body { font-family: sans-serif; white-space: pre-wrap; } h2,h3 { color: #3730a3; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write('<h2>Your weekly plan from Parent flow</h2>');
      printWindow.document.write(plan.replace(/\n/g, '<br/>'));
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 m-4 max-w-lg w-full text-left shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-800">Your personalized weekly plan</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        
        <div className="overflow-y-auto flex-1 pr-2">
            {isLoading ? (
                <div className="flex justify-center items-center h-48"><Spinner /></div>
            ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{plan}</p>
            )}
        </div>
        
        <p className="text-xs text-center text-gray-500 mt-4 italic">
            For guidance only. Not a diagnosis.
        </p>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
           <button
            onClick={handlePrint}
            disabled={isLoading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-indigo-300"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanModal;