"use client"; // motion components are client components

import React from 'react';
import { motion } from 'framer-motion';

interface ClueProps {
  clueId?: string;
  customText?: string; // Allow custom text for more flexibility
}

const Clue: React.FC<ClueProps> = ({ clueId, customText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-4 rounded shadow"
    >
      <p className="font-semibold">Clue {clueId ? `for "${clueId}"` : ""}:</p>
      <p>{customText || "A helpful clue will appear here when requested or triggered."}</p>
    </motion.div>
  );
};

export default Clue;
