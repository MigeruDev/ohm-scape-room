"use client";

import React, { useState, useEffect } from 'react';

interface TimerProps {
  duration: number; // Duration in seconds
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // Exit early if time is up or duration is invalid
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    // Set up the interval
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval on component unmount or when timeLeft changes
    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-200 p-2 sm:p-3 rounded shadow">
      <p className="text-xl sm:text-2xl font-mono text-gray-800">
        {formatTime(timeLeft)}
      </p>
    </div>
  );
};

export default Timer;
