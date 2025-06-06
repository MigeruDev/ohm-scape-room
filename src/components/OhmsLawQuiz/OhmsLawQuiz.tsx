"use client";

import React, { useState } from 'react';
import useSound from '@/hooks/useSound'; // For immediate feedback

interface OhmsLawQuizProps {
  voltage: number;
  resistance: number;
  onSolve: () => void; // Simplified: only called on correct solve
}

const OhmsLawQuiz: React.FC<OhmsLawQuizProps> = ({ voltage, resistance, onSolve }) => {
  const [currentUserInput, setCurrentUserInput] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const { playSound } = useSound();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (currentUserInput.trim() === '') {
      setFeedbackMessage("Please enter a value for the current.");
      return;
    }
    const expectedCurrent = voltage / resistance;
    const userAnswerNumeric = parseFloat(currentUserInput);

    if (userAnswerNumeric === expectedCurrent) {
      playSound('correct.mp3');
      setFeedbackMessage(null); // Clear any previous incorrect feedback
      onSolve(); // Notify parent component of correct solve
    } else {
      playSound('incorrect.mp3');
      setFeedbackMessage(
        `Not quite! Remember Ohm's Law: Current (I) = Voltage (V) / Resistance (R).
         With V=${voltage}V and R=${resistance}Ω, the current should be ${expectedCurrent.toFixed(2)}A.
         You entered ${userAnswerNumeric}A. Try calculating again.`
      );
    }
  };

  return (
    <div className="border-2 border-blue-500 p-4 sm:p-6 my-4 rounded-lg shadow-lg text-gray-700">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-700">Ohm's Law Challenge</h3>
      <p className="mb-2 text-sm sm:text-base">
        Given the following values, calculate the missing one.
      </p>
      <div className="bg-blue-50 p-3 sm:p-4 rounded mb-3 sm:mb-4">
        <p className="text-base sm:text-lg">Voltage (V): <span className="font-bold text-blue-600">{voltage} V</span></p>
        <p className="text-base sm:text-lg">Resistance (R): <span className="font-bold text-blue-600">{resistance} Ω</span></p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="currentInput" className="block text-xs sm:text-sm font-medium">
            Calculate Current (I) in Amperes (A):
          </label>
          <input
            type="number"
            id="currentInput"
            name="currentInput"
            value={currentUserInput}
            onChange={(e) => {
              setCurrentUserInput(e.target.value);
              if (feedbackMessage) setFeedbackMessage(null); // Clear feedback on new input
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            placeholder="Enter current in Amperes"
            step="any"
            aria-describedby="current-feedback"
          />
        </div>
        {feedbackMessage && (
          <div
            id="current-feedback"
            className={`p-2 sm:p-3 rounded text-xs sm:text-sm whitespace-pre-line ${
              feedbackMessage.startsWith('Not quite') ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
            }`}
            role="alert"
          >
            {feedbackMessage}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded focus:outline-none focus:shadow-outline text-sm sm:text-base"
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
};

export default OhmsLawQuiz;
