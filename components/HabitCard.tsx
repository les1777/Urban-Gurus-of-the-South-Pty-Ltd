
import React from 'react';
import type { DraggableProvided } from 'react-beautiful-dnd';
import { HabitBlock } from '../types';

interface HabitCardProps {
  block: HabitBlock;
  provided: DraggableProvided;
  isCompleted: boolean;
  updateStatus: (blockId: string, isComplete: boolean) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ block, provided, isCompleted, updateStatus }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`bg-white mb-4 p-5 rounded-lg soft-shadow transition-all border border-gray-100 ${isCompleted ? 'bg-gray-100/70 opacity-70' : ''}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-stone-700">{block.title}</h3>
          <small className="text-gray-400 font-medium">{block.time}</small>
        </div>
        <div className="flex items-center space-x-2">
            <label htmlFor={`complete-${block.id}`} className="text-sm font-medium text-gray-600">Done</label>
            <input 
                id={`complete-${block.id}`}
                type="checkbox" 
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                checked={isCompleted}
                onChange={(e) => updateStatus(block.id, e.target.checked)} 
            />
        </div>
      </div>

      <ul className="list-disc list-inside mt-4 space-y-2 text-stone-600">
        {block.tasks.map((task, idx) => (
          <li key={idx} className={isCompleted ? 'line-through text-gray-400' : ''}>{task}</li>
        ))}
      </ul>

      {block.suggestions && block.suggestions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="font-semibold text-sm text-indigo-700">💡 Next step</p>
          <p className="mt-1 text-sm text-stone-600">{block.suggestions[0]}</p>
        </div>
      )}
    </div>
  );
};

export default HabitCard;