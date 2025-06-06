"use client";

import React, { ReactNode, useEffect } from 'react'; // Added useEffect
import Timer from '@/components/Timer/Timer';
import useSound from '@/hooks/useSound'; // Import the sound hook

interface RoomLayoutProps {
  children: ReactNode;
  roomTitle: string;
}

const ROOM_DURATION_SECONDS = 15 * 60; // 15 minutes for the room

const RoomLayout: React.FC<RoomLayoutProps> = ({ children, roomTitle }) => {
  const { playLoop, stopSound } = useSound();

  useEffect(() => {
    playLoop('background-hum.mp3', 0.1); // Play background hum at low volume

    return () => {
      stopSound('background-hum.mp3'); // Stop hum when layout unmounts (e.g. navigating away from rooms)
    };
  }, [playLoop, stopSound]);

  const handleTimeUp = () => {
    alert("Time's up! You did not escape in time.");
    console.log('Timer reached zero in RoomLayout.');
    // Potentially stop all sounds or change background music
  };

  return (
    <main className="container mx-auto px-4 py-4 sm:py-6 md:py-8"> {/* Adjusted vertical padding */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6"> {/* Stack on small, row on sm+ */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">{roomTitle}</h2> {/* Adjusted title size and margin */}
        <Timer duration={ROOM_DURATION_SECONDS} onTimeUp={handleTimeUp} />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6"> {/* Adjusted content padding */}
        {children}
      </div>
    </main>
  );
};

export default RoomLayout;
