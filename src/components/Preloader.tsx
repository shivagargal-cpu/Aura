import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F6EFE6] text-[#251B14] select-none"
        >
          {/* Ambient soft glow behind logo */}
          <div className="absolute w-72 h-72 rounded-full bg-[#E8DAC9]/50 blur-3xl pointer-events-none" />

          {/* Luxury Monogram */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6"
          >
            <div className="w-16 h-16 rounded-full border border-[#8C735F] flex items-center justify-center bg-[#FAF6F0] shadow-md">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-[#4A392D] stroke-current"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="2" x2="12" y2="22" />
                <path d="M12 7l5 5-5 5" />
                <path d="M12 7l-5 5 5 5" />
              </svg>
            </div>
            {/* Fine rotating golden arc */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="absolute -inset-1.5 rounded-full border border-dashed border-[#C49B71]/40"
            />
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-[#251B14] uppercase mb-2"
          >
            AURA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#8C735F] font-medium mb-8"
          >
            Fine Dining & Culinary Atelier
          </motion.p>

          {/* Minimalist Progress Line */}
          <div className="w-44 h-[2px] bg-[#E3D6C5] rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-[#8C735F]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <span className="font-mono text-[10px] text-[#A69584] mt-3 tabular-nums tracking-widest">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
