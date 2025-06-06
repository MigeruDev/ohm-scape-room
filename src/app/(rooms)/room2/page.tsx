"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Import motion
import RoomLayout from '@/components/layout/RoomLayout/RoomLayout';
import PuzzlePlaceholder from '@/components/PuzzlePlaceholder/PuzzlePlaceholder';
import Clue from '@/components/Clue/Clue';
import CircuitDnDQuiz from '@/components/CircuitDnDQuiz/CircuitDnDQuiz';
import { useGameContext } from '@/context/GameContext';
import useSound from '@/hooks/useSound'; // Import useSound

const Room2Page: React.FC = () => {
  const { unlockFinalRoom, isRoomUnlocked } = useGameContext();
  const router = useRouter();
  const { playSound } = useSound();
  const [isCircuitSolved, setIsCircuitSolved] = useState(false);
  const [showCircuitClue, setShowCircuitClue] = useState(false);

  useEffect(() => {
    if (!isRoomUnlocked('room2')) {
      router.push('/room1');
    }
  }, [isRoomUnlocked, router]);

  const handleSolveCircuit = (isCorrect: boolean) => {
    if (isCorrect) {
      playSound('correct.mp3');
      setIsCircuitSolved(true);
      setShowCircuitClue(true);
      unlockFinalRoom();
    } else {
      playSound('incorrect.mp3');
      // The CircuitDnDQuiz itself doesn't have explicit incorrect attempt feedback to the parent yet,
      // but we play a sound. We could add more robust feedback if needed.
    }
  };

  if (!isRoomUnlocked('room2')) {
    return (
      <RoomLayout roomTitle="Room 2: Access Denied">
        <p className="text-lg sm:text-xl text-center text-red-500 p-4">This room is locked. Redirecting...</p>
      </RoomLayout>
    );
  }

  return (
    <RoomLayout roomTitle="Room 2: The Ancient Library">
      <p className="mb-4 text-sm sm:text-base">
        You&apos;ve entered the Ancient Library. The knowledge within holds the key, but beware of its guardians.
      </p>

      {!isCircuitSolved ? (
        <CircuitDnDQuiz onSolve={handleSolveCircuit} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-3 sm:p-4 bg-green-100 border border-green-400 text-green-700 rounded shadow text-sm sm:text-base"
        >
          <p className="font-bold text-base sm:text-lg">Circuit Puzzle Solved!</p>
          <p className="mb-2">The ancient device hums to life, projecting a map fragment onto the wall! The path to the final chamber is open.</p>
          <Link href="/final-room" legacyBehavior>
            <a className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-sm">
              Proceed to the Final Room
            </a>
          </Link>
        </motion.div>
      )}

      {showCircuitClue && (
         <Clue
          clueId="ancient-tome-clue1"
          customText="The map fragment points towards a hidden mechanism in the final chamber."
        />
      )}

      {!isCircuitSolved && <PuzzlePlaceholder puzzleId="celestial-map" />}

    </RoomLayout>
  );
};

export default Room2Page;
