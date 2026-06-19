"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex pointer-events-none">
        {/* Left Panel */}
        <motion.div
          className="flex-1 bg-[#050505] flex items-center justify-end pr-8"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
          onAnimationComplete={onComplete}
        >
          <motion.span
            className="font-archivo text-[clamp(2rem,6vw,6rem)] text-white tracking-tighter"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.7 }}
          >
            M
          </motion.span>
        </motion.div>

        {/* Center Glitch Text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.15, delay: 0.75 }}
        >
          <div className="relative">
            <h1 className="font-archivo text-[clamp(4rem,15vw,14rem)] text-white tracking-tighter leading-none">
              M<span style={{ color: "#00F0FF" }}>/</span>YK
            </h1>
            {/* Cyan glitch copy */}
            <h1
              className="font-archivo text-[clamp(4rem,15vw,14rem)] tracking-tighter leading-none absolute inset-0"
              style={{ color: "#00F0FF", opacity: 0.4, transform: "translate(3px, -2px)", mixBlendMode: "screen" }}
            >
              M<span style={{ color: "#FF0055" }}>/</span>YK
            </h1>
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className="flex-1 bg-[#050505] flex items-center justify-start pl-8"
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
        >
          <motion.span
            className="font-archivo text-[clamp(2rem,6vw,6rem)] text-[#00F0FF] tracking-tighter"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.7 }}
          >
            YK
          </motion.span>
        </motion.div>

        {/* Scan Line */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-[#00F0FF]"
          style={{ top: "50%" }}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1], ease: "easeInOut", delay: 0.1 }}
        />
      </div>
    </AnimatePresence>
  );
}
