"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UnlockedRooms {
  room1: boolean;
  room2: boolean;
  finalRoom: boolean;
}

interface GameContextType {
  unlockedRooms: UnlockedRooms;
  unlockRoom2: () => void;
  unlockFinalRoom: () => void;
  isRoomUnlocked: (roomId: keyof UnlockedRooms) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unlockedRooms, setUnlockedRooms] = useState<UnlockedRooms>({
    room1: true, // Room 1 is unlocked by default
    room2: false,
    finalRoom: false,
  });

  const unlockRoom2 = () => {
    setUnlockedRooms(prev => ({ ...prev, room2: true }));
    console.log("Room 2 Unlocked!");
  };

  const unlockFinalRoom = () => {
    setUnlockedRooms(prev => ({ ...prev, finalRoom: true }));
    console.log("Final Room Unlocked!");
  };

  const isRoomUnlocked = (roomId: keyof UnlockedRooms): boolean => {
    return unlockedRooms[roomId];
  };

  return (
    <GameContext.Provider value={{ unlockedRooms, unlockRoom2, unlockFinalRoom, isRoomUnlocked }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
