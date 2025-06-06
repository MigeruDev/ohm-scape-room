"use client"; // Hooks often run in client components

import { useCallback, useRef, useEffect } from 'react';

interface UseSoundReturnType {
  playSound: (soundFile: string, volume?: number) => void;
  playLoop: (soundFile: string, volume?: number) => void;
  stopSound: (soundFile: string) => void;
  stopAllSounds: () => void;
}

const useSound = (): UseSoundReturnType => {
  const audioObjectsRef = useRef<Record<string, HTMLAudioElement>>({});

  // Prepend public path for sound files
  const getSoundPath = (soundFile: string) => `/sounds/${soundFile}`;

  const playSound = useCallback((soundFile: string, volume: number = 0.5) => {
    const path = getSoundPath(soundFile);
    let audio = audioObjectsRef.current[path];

    if (!audio) {
      audio = new Audio(path);
      audioObjectsRef.current[path] = audio;
    }

    audio.volume = volume;
    audio.loop = false;

    audio.play().catch(error => {
      console.warn(`Could not play sound ${soundFile}: ${error.message}. User interaction might be required.`);
    });
  }, []);

  const playLoop = useCallback((soundFile: string, volume: number = 0.2) => {
    const path = getSoundPath(soundFile);
    let audio = audioObjectsRef.current[path];

    if (!audio) {
      audio = new Audio(path);
      audioObjectsRef.current[path] = audio;
    }

    audio.volume = volume;
    audio.loop = true;

    audio.play().catch(error => {
      console.warn(`Could not play sound loop ${soundFile}: ${error.message}. User interaction might be required.`);
    });
  }, []);

  const stopSound = useCallback((soundFile: string) => {
    const path = getSoundPath(soundFile);
    const audio = audioObjectsRef.current[path];
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset time
    }
  }, []);

  const stopAllSounds = useCallback(() => {
    Object.values(audioObjectsRef.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);

  // Cleanup: stop all sounds when the component using the hook unmounts
  useEffect(() => {
    return () => {
      stopAllSounds();
    };
  }, [stopAllSounds]);

  return { playSound, playLoop, stopSound, stopAllSounds };
};

export default useSound;
