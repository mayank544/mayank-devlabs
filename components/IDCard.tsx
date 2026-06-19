"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";

export default function IDCard() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag coordinates relative to the initial position (x=0, y=0, which hangs 120px from top)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring behavior for buttery smooth rope sway and physics return
  const springX = useSpring(x, { stiffness: 80, damping: 10 });
  const springY = useSpring(y, { stiffness: 80, damping: 10 });

  // Rotate Z dynamically based on drag X to simulate natural swing
  const rotateZ = useTransform(springX, [-150, 150], [-25, 25]);
  const rotateX = useTransform(springY, [-100, 100], [15, -15]);

  // Dynamic SVG Bezier Path for the rope string. It bends when dragged!
  const ropePath = useTransform([springX, springY], ([cx, cy]) => {
    const startX = 112; // Center of the rope clip in the 224px width frame
    const startY = 0;   // Top of the viewport
    const endX = 112 + (cx as number);
    const endY = 120 + (cy as number); // Card hangs at 120px initially
    // Control point for Bezier curve (creates bend in rope)
    const controlX = startX + (cx as number) * 0.15;
    const controlY = endY * 0.5;
    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          ref={containerRef}
          className="fixed top-0 right-12 md:right-24 z-[5000] pointer-events-none w-56 h-[500px]"
        >
          {/* Lanyard SVG String */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {/* The rope string */}
            <motion.path
              d={ropePath}
              fill="none"
              stroke="#00F0FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
              strokeDasharray="4 2"
            />
            {/* Small clip connector at the end of the rope */}
            <motion.circle
              cx={useTransform(springX, (v) => 112 + v)}
              cy={useTransform(springY, (v) => 120 + v)}
              r="4"
              fill="#555"
              stroke="#00F0FF"
              strokeWidth="1"
            />
          </svg>

          {/* Draggable Card Holder */}
          <motion.div
            drag
            dragConstraints={{ left: -250, right: 250, top: -50, bottom: 250 }}
            dragElastic={0.2}
            dragTransition={{ power: 0.2, timeConstant: 300 }}
            style={{ x, y }}
            className="absolute top-[120px] left-0 pointer-events-auto cursor-grab active:cursor-grabbing select-none"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 2.2 }}
          >
            <motion.div
              style={{
                rotateZ,
                rotateX,
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
              whileHover={{ scale: 1.02 }}
              className="relative w-56 select-none"
            >
              {/* Metal clip on top of the physical card */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#222] border border-[#333] rounded-t-md flex items-center justify-center">
                <div className="w-3 h-1.5 bg-[#00F0FF]/30 rounded-full border border-[#00F0FF]/60" />
              </div>

              {/* Card Front */}
              <div className="bg-[#0a0a0a]/95 backdrop-blur-md border border-[#00F0FF]/40 rounded-xl overflow-hidden shadow-[0_0_35px_rgba(0,240,255,0.15)] p-4 relative">
                {/* Scanline line overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />

                {/* Top bar */}
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span className="font-mono text-[8px] text-[#00F0FF] tracking-widest uppercase">MAYANK DEV LABS</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
                    className="font-mono text-[8px] text-zinc-500 hover:text-white transition-colors cursor-none p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Avatar */}
                <div className="relative mx-auto w-20 h-20 mb-3 relative z-10">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#00F0FF]/60 relative bg-black">
                    <Image src="/avatar.png" alt="Mayank Kumar" fill className="object-cover" />
                  </div>
                  {/* Scan animation */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(transparent 40%, rgba(0,240,255,0.25) 50%, transparent 60%)" }}
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Online pulse */}
                  <div className="absolute -bottom-0.5 -right-0.5 flex items-center gap-1 bg-[#0a0a0a] px-1.5 py-0.5 rounded-full border border-[#39FF14]/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse"></div>
                    <span className="font-mono text-[7px] text-[#39FF14] uppercase tracking-wide">Online</span>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-3 relative z-10">
                  <h3 className="font-archivo text-white text-lg leading-none tracking-tighter">MAYANK.</h3>
                  <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Full Stack Developer</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 justify-center mb-3 relative z-10">
                  {["MERN", "AI", "Cyber"].map(t => (
                    <span key={t} className="font-mono text-[7px] border border-[#00F0FF]/30 text-[#00F0FF] px-1.5 py-0.5 rounded-sm uppercase tracking-wide bg-cyan/5">{t}</span>
                  ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[#111] pt-2 flex justify-between items-center relative z-10">
                  <span className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest">#OpenToWork</span>
                  <span className="font-mono text-[7px] text-[#00F0FF]/60 animate-pulse">Touch & Swing</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
