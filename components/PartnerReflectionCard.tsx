import React from 'react';

const reflectionPrompts = [
    "What's one small thing your partner did today that you appreciated?",
    "Share one 'beautiful mess' moment from today.",
    "What's one way we worked well as a team today?",
    "Acknowledge a moment where you saw your partner trying their best.",
];

const PartnerReflectionCard: React.FC = () => {
  const [prompt] = React.useState(
    reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)]
  );

  return (
    <div className="bg-amber-50 p-4 rounded-lg mb-4 text-amber-900 border border-amber-100">
      <h4 className="font-bold text-lg mb-2">🧠 Evening co-parent reflection</h4>
      <p className="text-sm mb-3 italic">"{prompt}"</p>
      <textarea
        placeholder="Leave a kind note for your partner..."
        className="w-full p-2 rounded-md border border-amber-200 bg-amber-50/50 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
        rows={3}
      ></textarea>
    </div>
  );
};

export default PartnerReflectionCard;