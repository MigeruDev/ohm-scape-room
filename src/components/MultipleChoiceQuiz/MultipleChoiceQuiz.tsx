"use client";

import React, { useState } from 'react';
import useSound from '@/hooks/useSound'; // Import useSound

export interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  explanation?: string; // Optional explanation for incorrect answers
}

interface MultipleChoiceQuizProps {
  questions: Question[];
  onComplete: (success: boolean) => void;
}

const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false); // Renamed for clarity
  const [quizFinished, setQuizFinished] = useState(false);
  const { playSound } = useSound();

  const handleAnswerSelection = (selectedOption: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newAnswers);

    const correct = selectedOption === questions[currentQuestionIndex].correctAnswer;
    setIsCorrectAnswer(correct);
    setShowFeedback(true);

    if (correct) {
      playSound('correct.mp3', 0.3); // Slightly lower volume for per-question feedback
    } else {
      playSound('incorrect.mp3', 0.3);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question answered
      setQuizFinished(true);
      const allCorrect = userAnswers.every((answer, index) => answer === questions[index].correctAnswer);
      onComplete(allCorrect);
    }
  };

  if (quizFinished) {
    const allCorrect = userAnswers.every((answer, index) => answer === questions[index].correctAnswer);
    return (
      <div className="p-4 sm:p-6 border rounded-lg shadow-lg bg-white">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">Quiz Completed!</h3>
        {allCorrect ? (
          <p className="text-green-600 text-base sm:text-lg text-center">Congratulations! All answers are correct.</p>
        ) : (
          <p className="text-red-600 text-base sm:text-lg text-center">
            You missed some questions. Review the concepts and try again if needed.
          </p>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4 sm:p-6 border rounded-lg shadow-lg bg-white">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-indigo-700">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h3>
      <p className="text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg">{currentQuestion.text}</p>

      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelection(option)}
            disabled={showFeedback}
            className={`block w-full text-left p-2.5 sm:p-3 rounded-md border text-sm sm:text-base
                        transition-colors duration-150 ease-in-out
                        ${showFeedback && option === currentQuestion.correctAnswer ? 'bg-green-200 border-green-400 text-green-800' : ''}
                        ${showFeedback && userAnswers[currentQuestionIndex] === option && option !== currentQuestion.correctAnswer ? 'bg-red-200 border-red-400 text-red-800' : ''}
                        ${!showFeedback ? 'bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-700' : 'text-gray-700'}
                        ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`p-2 sm:p-3 mb-3 sm:mb-4 rounded text-center font-medium text-xs sm:text-sm
                       ${isCorrectAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isCorrectAnswer
            ? 'Correct!'
            : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}.
               ${currentQuestion.explanation ? `Explanation: ${currentQuestion.explanation}` : ''}`
          }
        </div>
      )}

      {showFeedback && (
        <button
          onClick={handleNextQuestion}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded focus:outline-none focus:shadow-outline text-sm sm:text-base"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      )}
    </div>
  );
};

export default MultipleChoiceQuiz;
