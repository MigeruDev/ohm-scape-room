import React from 'react';

interface PuzzlePlaceholderProps {
  puzzleId?: string;
}

const PuzzlePlaceholder: React.FC<PuzzlePlaceholderProps> = ({ puzzleId }) => {
  return (
    <div className="border-2 border-dashed border-gray-400 p-8 my-4 rounded-lg text-center">
      <p className="text-gray-600">
        Puzzle {puzzleId ? `"${puzzleId}"` : ""} will be here.
      </p>
    </div>
  );
};

export default PuzzlePlaceholder;
