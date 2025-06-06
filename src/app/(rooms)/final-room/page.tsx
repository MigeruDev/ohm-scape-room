"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Import motion
import RoomLayout from '@/components/layout/RoomLayout/RoomLayout';
import { useGameContext } from '@/context/GameContext';
import MultipleChoiceQuiz, { Question } from '@/components/MultipleChoiceQuiz/MultipleChoiceQuiz';
import useSound from '@/hooks/useSound'; // Import useSound

const finalQuizQuestions: Question[] = [
  {
    text: "In Ohm's Law, if Voltage (V) is 12V and Resistance (R) is 4Ω, what is Current (I)?",
    options: ["3A", "0.33A", "48A", "8A"],
    correctAnswer: "3A",
    explanation: "Ohm's Law states I = V/R. So, I = 12V / 4Ω = 3A.",
  },
  {
    text: "Which of these components is typically used to store electrical energy in a circuit (often in the form of an electric field)?",
    options: ["Resistor", "Switch", "Capacitor", "LED"],
    correctAnswer: "Capacitor",
    explanation: "Capacitors store energy in an electric field. Batteries store chemical energy and convert it.",
  },
  {
    text: "What does a Resistor primarily do in a circuit?",
    options: ["Increase current flow", "Limit current flow", "Store charge", "Generate light"],
    correctAnswer: "Limit current flow",
    explanation: "Resistors impede the flow of electrical current, converting electrical energy into heat.",
  },
  {
    text: "Which material is a good conductor of electricity, meaning it allows electrons to flow freely?",
    options: ["Rubber", "Glass", "Copper", "Wood"],
    correctAnswer: "Copper",
    explanation: "Copper is a metal with free electrons that allow it to conduct electricity effectively. Others are insulators.",
  }
];

const FinalRoomPage: React.FC = () => {
  const { isRoomUnlocked } = useGameContext(); // Assuming stopAllSounds might be added to context
  const router = useRouter();
  const { playSound, stopSound: stopBackgroundHum } = useSound(); // For specific sounds in this room
  const [isLabEscaped, setIsLabEscaped] = useState(false);

  useEffect(() => {
    if (!isRoomUnlocked('finalRoom')) {
      if (isRoomUnlocked('room2')) {
        router.push('/room2');
      } else {
        router.push('/room1');
      }
    }
  }, [isRoomUnlocked, router]);

  const handleQuizComplete = (success: boolean) => {
    if (success) {
      playSound('correct.mp3'); // Play success sound
      setIsLabEscaped(true);
      stopBackgroundHum('background-hum.mp3'); // Stop room hum
      // If a general stop all sounds from context is available:
      // stopGameSounds?.(); // This depends on if you add stopAllSounds to GameContext
    } else {
      playSound('incorrect.mp3'); // Play incorrect sound
      alert("Some answers were incorrect. Please review the concepts and try the quiz again if needed.");
    }
  };

  if (!isRoomUnlocked('finalRoom')) {
    return (
      <RoomLayout roomTitle="Final Chamber: Access Denied">
        <p className="text-lg sm:text-xl text-center text-red-500 p-4">This room is locked. Redirecting...</p>
      </RoomLayout>
    );
  }

  if (isLabEscaped) {
    return (
      <RoomLayout roomTitle="ESCAPED!">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-center p-6 sm:p-10 bg-green-50 rounded-lg shadow-xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4 sm:mb-6">Congratulations!</h2>
          <p className="text-xl sm:text-2xl text-gray-700 mb-3 sm:mb-4">You&apos;ve successfully solved all the puzzles and escaped the lab!</p>
          <p className="text-base sm:text-lg text-gray-600">Your knowledge of circuits and quick thinking have paid off.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded text-base sm:text-lg shadow-md hover:shadow-lg transition-shadow"
          >
            Play Again?
          </button>
        </motion.div>
      </RoomLayout>
    );
  }

  return (
    <RoomLayout roomTitle="The Final Chamber: The Final Test">
      <p className="mb-4 sm:mb-6 text-sm sm:text-lg text-center text-gray-700">
        To escape, you must pass the final knowledge test. Prove your understanding of the concepts you&apos;ve encountered.
      </p>

      <MultipleChoiceQuiz questions={finalQuizQuestions} onComplete={handleQuizComplete} />

    </RoomLayout>
  );
};

export default FinalRoomPage;
