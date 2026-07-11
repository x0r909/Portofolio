"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLoaderProps {
  onComplete: () => void;
}

const TerminalLoader = ({ onComplete }: TerminalLoaderProps) => {
  const [text, setText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const command = "whoami";

  useEffect(() => {
    let currentIndex = 0;

    // Initial delay before typing starts
    const startDelay = setTimeout(() => {
      // Type out the command
      const typingInterval = setInterval(() => {
        if (currentIndex <= command.length) {
          setText(command.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);

          // Small pause after typing before showing result
          setTimeout(() => {
            setShowResult(true);

            // Hold the result briefly, then complete
            setTimeout(() => {
              onComplete();
            }, 1200);
          }, 400);
        }
      }, 150); // Speed of typing
    }, 500);

    return () => {
      clearTimeout(startDelay);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-cyber-bg flex items-center justify-center p-4"
      >
        <div className="w-full max-w-2xl bg-black border border-cyber-border rounded overflow-hidden shadow-[0_0_20px_rgba(0,255,240,0.1)]">
          {/* Terminal Header */}
          <div className="bg-[#1e1e2e] px-4 py-2 border-b border-cyber-border flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto text-xs font-mono text-gray-400">
              augie@secure-terminal:~
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono min-h-[300px] text-sm md:text-base">
            <div className="mb-2 text-cyber-dim">
              [SYSTEM INITIATING...]
              <br />
              Establishing secure connection... <span className="text-cyber-green">SUCCESS</span>
            </div>

            <div className="flex items-center gap-2 mt-4 text-cyber-green">
              <span>root@system:~$</span>
              <span className="text-white">
                {text}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2.5 h-5 bg-cyber-cyan align-middle ml-0.5"
                />
              </span>
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-cyber-cyan"
              >
                augie.a.s_
                <br />
                <span className="text-cyber-magenta mt-1 block">ACCESS GRANTED.</span>
                <span className="text-cyber-dim mt-4 block">Loading interface modules...</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scan line effect over terminal */}
        <div className="fixed top-0 left-0 w-full h-px bg-cyber-cyan/30 animate-scan-line pointer-events-none"></div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TerminalLoader;
