"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import motion
import RoomLayout from '@/components/layout/RoomLayout/RoomLayout';
import PuzzlePlaceholder from '@/components/PuzzlePlaceholder/PuzzlePlaceholder';
import Clue from '@/components/Clue/Clue';
import OhmsLawQuiz from '@/components/OhmsLawQuiz/OhmsLawQuiz';
import { useGameContext } from '@/context/GameContext';
import useSound from '@/hooks/useSound'; // Import useSound

const Room1Page: React.FC = () => {
  const { unlockRoom2 } = useGameContext();
  // playSound for incorrect answers is now handled within OhmsLawQuiz
  const [voltage] = useState(12);
  const [resistance] = useState(4);
  const [isOhmsLawSolved, setIsOhmsLawSolved] = useState(false);
  const [showOhmsLawClue, setShowOhmsLawClue] = useState(false);

  // This function is now only called upon a correct solve
  const handleOhmsLawCorrect = () => {
    // playSound('correct.mp3') is already called by OhmsLawQuiz
    setIsOhmsLawSolved(true);
    setShowOhmsLawClue(true);
    unlockRoom2();
  };

  return (
    <RoomLayout roomTitle="Room 1: The Alchemist's Study">
      <p className="mb-4 text-sm sm:text-base">
        Welcome to the Alchemist&apos;s Study. Unravel the secrets hidden within to find your way out.
      </p>

      {!isOhmsLawSolved ? (
        <OhmsLawQuiz
          voltage={voltage}
          resistance={resistance}
          onSolve={handleOhmsLawCorrect} // Updated to new handler
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-3 sm:p-4 bg-green-100 border border-green-400 text-green-700 rounded shadow text-sm sm:text-base"
        >
          <p className="font-bold text-base sm:text-lg">Ohm&apos;s Law Puzzle Solved!</p>
          <p className="mb-2">The current flows correctly. A hidden panel opens, revealing a new clue and a path forward!</p>
          <Link href="/room2" legacyBehavior>
            <a className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-sm">
              Proceed to Room 2
            </a>
          </Link>
        </motion.div>
      )}

      {/* The Clue component already has its own animation. It will appear when showOhmsLawClue is true. */}
      {showOhmsLawClue && (
        <Clue
          clueId="alchemy-desk-clue1"
          customText="The old tome mentions a hidden compartment activated by correct current flow."
        />
      )}

      {/* This placeholder could be for a secondary puzzle or removed if OhmsLawQuiz is the only one */}
      {!isOhmsLawSolved && <PuzzlePlaceholder puzzleId="potion-shelf" />}
    </RoomLayout>
  );
};

export default Room1Page;
