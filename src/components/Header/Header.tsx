"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // To highlight active link
import { useGameContext } from '@/context/GameContext';

const Header: React.FC = () => {
  const { isRoomUnlocked } = useGameContext();
  const pathname = usePathname();

  const navLinkClasses = (path: string, isEnabled: boolean) =>
    `px-3 py-2 rounded-md text-sm font-medium
    ${pathname === path
      ? 'bg-gray-900 text-white'
      : isEnabled
        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
        : 'text-gray-500 cursor-not-allowed'}`;

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-2 sm:px-4 py-3 flex flex-wrap justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-lg sm:text-xl font-bold hover:text-gray-300 mr-4 whitespace-nowrap">Escape Room Lab</a>
        </Link>
        {/* Navigation Links: Allow wrapping and adjust spacing for smaller screens */}
        <div className="flex items-center space-x-1 sm:space-x-2 mt-2 sm:mt-0">
          <Link href="/room1" legacyBehavior>
            <a className={navLinkClasses("/room1", isRoomUnlocked('room1'))}>
              <span className="hidden sm:inline">Room </span>1
            </a>
          </Link>
          <Link href="/room2" legacyBehavior>
            <a className={navLinkClasses("/room2", isRoomUnlocked('room2'))}>
              <span className="hidden sm:inline">Room </span>2
              {!isRoomUnlocked('room2') && <span className="text-xs"> (L)</span>}
            </a>
          </Link>
          <Link href="/final-room" legacyBehavior>
            <a className={navLinkClasses("/final-room", isRoomUnlocked('finalRoom'))}>
              Final
              {!isRoomUnlocked('finalRoom') && <span className="text-xs"> (L)</span>}
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
