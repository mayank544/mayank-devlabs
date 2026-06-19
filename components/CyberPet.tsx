"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Mood =
  | "idle"
  | "patrol"
  | "love"
  | "chew"
  | "taste"
  | "drink"
  | "gross"
  | "angry"
  | "dance"
  | "fall"
  | "hungry"
  | "sleepy"
  | "flex"
  | "spin";

type Prop = "nut" | "juice" | "bottle" | "spark" | null;

const idleLines = [
  "Mayank boss, main live hoon.",
  "Click karo, mood upgrade hoga.",
  "Naam ke N tak patrol karunga.",
  "Meri battery full, drama full.",
  "Nut milega to performance boost.",
  "Website guard mode active.",
  "Visitor ko entertain karna mera kaam.",
  "Palak juice suspicious liquid hai.",
  "Main chhota robot, bada attitude.",
  "Thoda pyaar pending hai.",
  "Score badhao, main dance karunga.",
  "MAYANK ke paas round laga ke aata hoon.",
  "Main addictive feature ban raha hoon.",
  "Scroll karo, main bhi hilta rahunga.",
  "Pet me low battery ka feeling hai.",
];

const lines: Record<Mood, string[]> = {
  idle: idleLines,
  patrol: ["MAYANK patrol start.", "N tak jaake wapas.", "Naam scan kar raha hoon."],
  love: ["Aww, pyaar stored.", "Heart cache full.", "Aur pet karo na."],
  chew: ["Crunch crunch...", "Nut ko respect se kha raha hoon.", "Thoda time do, taste aa raha hai."],
  taste: ["Taste: 10/10.", "Nut approved.", "Chef Mayank certified."],
  drink: ["Palak juice? risk accepted.", "Smell check... system doubt.", "Sip le raha hoon, pray karo."],
  gross: ["Eww, green update failed.", "Palak uninstall karo.", "Mujhe nut chahiye tha bhai."],
  angry: ["Ignore mat karo.", "Khana nahi diya to protest.", "Main gussa mode me hoon."],
  dance: ["Secret bottle detected.", "Dance.exe running.", "Straight walk disabled."],
  fall: ["Oof. Dignity reboot.", "Floor test successful.", "Main gira nahi, stylish landing thi."],
  hungry: ["Snack request bhej diya.", "Pet me loading icon hai.", "Double tap = nut, yaad rakhna."],
  sleepy: ["Sleep mode 2 sec.", "Battery saving...", "Zzz... par duty pe hoon."],
  flex: ["Look at my tiny core.", "Abs nahi, motherboard hai.", "Main model upgrade ho gaya."],
  spin: ["Spin bonus unlocked.", "Score farming detected.", "Bas bas, chakkar aa raha hai."],
};

const moodPoints: Partial<Record<Mood, number>> = {
  love: 1,
  taste: 3,
  gross: 2,
  dance: 4,
  spin: 5,
};

export default function CyberPet() {
  const [mood, setMood] = useState<Mood>("idle");
  const [line, setLine] = useState(idleLines[0]);
  const [prop, setProp] = useState<Prop>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const tapCount = useRef(0);
  const tapTimer = useRef<number | null>(null);
  const busy = useRef(false);

  const say = (nextMood: Mood, custom?: string) => {
    setMood(nextMood);
    setLine(custom || lines[nextMood][Math.floor(Math.random() * lines[nextMood].length)]);
    if (moodPoints[nextMood]) {
      setScore((value) => value + (moodPoints[nextMood] || 0));
      setStreak((value) => Math.min(value + 1, 99));
    }
  };

  const resetLater = (delay = 1200) => {
    window.setTimeout(() => {
      busy.current = false;
      setProp(null);
      say("idle", idleLines[Math.floor(Math.random() * idleLines.length)]);
    }, delay);
  };

  const love = () => {
    if (busy.current) return;
    busy.current = true;
    setProp("spark");
    say("patrol", "Naam ke paas pyaar lene ja raha hoon.");
    window.setTimeout(() => say("love", "Pyaar received. Score +1."), 1900);
    resetLater(3900);
  };

  const feedNut = () => {
    if (busy.current) return;
    busy.current = true;
    setProp("nut");
    say("patrol", "Bowl pickup route start.");
    window.setTimeout(() => say("chew", "Crunch crunch... slow eating mode."), 1300);
    window.setTimeout(() => say("taste", "Taste: perfect. Score +3."), 3900);
    resetLater(6400);
  };

  const drinkPalak = () => {
    if (busy.current) return;
    busy.current = true;
    setProp("juice");
    say("drink", "Palak glass inspect kar raha hoon.");
    window.setTimeout(() => say("drink", "Sip sip... ye healthy trap hai."), 1700);
    window.setTimeout(() => say("gross", "Reaction: nahi bhai, green bug!"), 4300);
    resetLater(6900);
  };

  const bottleDance = () => {
    if (busy.current) return;
    busy.current = true;
    setProp("bottle");
    say("dance", "Secret bottle unlock. Dance mode.");
    window.setTimeout(() => say("spin", "Bonus spin! Score +5."), 1900);
    window.setTimeout(() => say("fall", "Balance failed. Rebooting style."), 3700);
    resetLater(5600);
  };

  const handleTap = () => {
    tapCount.current += 1;
    if (tapTimer.current) window.clearTimeout(tapTimer.current);

    tapTimer.current = window.setTimeout(() => {
      const taps = tapCount.current;
      tapCount.current = 0;

      if (taps >= 4) bottleDance();
      else if (taps === 3) drinkPalak();
      else if (taps === 2) feedNut();
      else love();
    }, 270);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (busy.current) return;
      const roll = Math.random();

      if (roll < 0.2) {
        busy.current = true;
        say("patrol");
        resetLater(4200);
      } else if (roll < 0.34) {
        busy.current = true;
        say("hungry");
        resetLater(2600);
      } else if (roll < 0.48) {
        busy.current = true;
        say("flex");
        resetLater(2600);
      } else if (roll < 0.6) {
        busy.current = true;
        say("angry");
        setStreak(0);
        resetLater(2800);
      } else if (roll < 0.68) {
        bottleDance();
      } else {
        say("idle", idleLines[Math.floor(Math.random() * idleLines.length)]);
      }
    }, 6200);

    return () => window.clearInterval(interval);
    // Keep one autonomous loop; state changes should not restart its timing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const faceColor =
    mood === "love"
      ? "border-pink text-pink shadow-[0_0_24px_rgba(255,0,85,0.45)]"
      : mood === "chew" || mood === "taste" || mood === "hungry"
      ? "border-lime text-lime shadow-[0_0_24px_rgba(57,255,20,0.35)]"
      : mood === "drink" || mood === "gross" || mood === "angry"
      ? "border-[#FF7A00] text-[#FF7A00] shadow-[0_0_24px_rgba(255,122,0,0.42)]"
      : mood === "dance" || mood === "fall" || mood === "spin"
      ? "border-[#9B5CFF] text-[#9B5CFF] shadow-[0_0_24px_rgba(155,92,255,0.42)]"
      : "border-cyan text-cyan shadow-[0_0_22px_rgba(0,240,255,0.3)]";

  const patrol = mood === "patrol" || mood === "love";
  const travel = patrol
    ? {
        x: [0, -50, -120, -180, -90, 0],
        y: [0, 14, -10, 10, 18, 0],
      }
    : {
        x: [0, -20, 20, -10, 0],
        y: [0, 14, -10, 8, 0],
      };

  const bodyMotion =
    mood === "chew"
      ? { y: [0, 5, 0], scaleY: [1, 0.92, 1.06, 1] }
      : mood === "gross" || mood === "angry"
      ? { x: [0, -7, 7, -6, 6, 0], rotate: [0, -8, 8, -6, 6, 0] }
      : mood === "dance"
      ? { rotate: [-16, 16, -14, 14, 0], y: [0, -10, 5, -8, 0] }
      : mood === "spin"
      ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.08, 1] }
      : mood === "fall"
      ? { rotate: [0, 28, 78, 84], y: [0, 10, 26, 26] }
      : mood === "flex"
      ? { scale: [1, 1.1, 1], rotate: [-4, 4, -4] }
      : mood === "love"
      ? { scale: [1, 1.08, 1], rotate: [-5, 5, 0] }
      : { y: [0, -5, 0] };

  return (
    <motion.div
      className="pointer-events-none absolute right-2 top-0 z-20 h-40 w-40 sm:h-44 sm:w-44 md:right-4 md:top-1"
      animate={travel}
      transition={{ duration: patrol ? 7 : 10, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden={false}
    >
      <motion.button
        type="button"
        aria-label="Mayank mini robot pet"
        onPointerUp={handleTap}
        className="hover-target pointer-events-auto absolute left-12 top-9 h-24 w-20 touch-manipulation cursor-pointer bg-transparent outline-none"
        animate={bodyMotion}
        whileTap={{ scale: 0.94 }}
        transition={{
          duration: mood === "idle" ? 2.4 : mood === "chew" ? 0.75 : mood === "spin" ? 0.8 : 0.7,
          repeat: mood === "idle" || mood === "chew" || mood === "dance" ? Infinity : 0,
        }}
      >
        <motion.span
          className="absolute -top-4 left-1/2 h-5 w-px -translate-x-1/2 bg-zinc-500"
          animate={{ rotate: mood === "dance" || mood === "spin" ? [-12, 12, -12] : [0, 8, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        >
          <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px_#00F0FF]" />
        </motion.span>

        <span className={`relative mx-auto flex h-12 w-16 items-center justify-center rounded-lg border-2 bg-[#070707] ${faceColor}`}>
          <span className="absolute left-1 top-1 h-1 w-2 bg-white/25" />
          <span className="absolute right-1 top-1 h-1 w-2 bg-white/15" />

          <motion.span
            className="absolute -left-5 top-5 h-2 w-6 origin-right rounded-l bg-zinc-700"
            animate={
              mood === "love"
                ? { rotate: [-20, -62, -20] }
                : mood === "angry"
                ? { rotate: [0, -32, 0] }
                : mood === "dance" || mood === "spin"
                ? { rotate: [-60, 45, -60] }
                : { rotate: [10, -10, 10] }
            }
            transition={{ duration: mood === "dance" || mood === "spin" ? 0.32 : 1, repeat: Infinity }}
          />
          <motion.span
            className="absolute -right-5 top-5 h-2 w-6 origin-left rounded-r bg-zinc-700"
            animate={
              mood === "love"
                ? { rotate: [20, 62, 20] }
                : mood === "angry"
                ? { rotate: [0, 32, 0] }
                : mood === "dance" || mood === "spin"
                ? { rotate: [60, -45, 60] }
                : { rotate: [-10, 10, -10] }
            }
            transition={{ duration: mood === "dance" || mood === "spin" ? 0.32 : 1, repeat: Infinity }}
          />

          <span className="flex items-center gap-2.5">
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-current"
              animate={
                mood === "angry"
                  ? { scaleY: 0.35, rotate: 25 }
                  : mood === "gross"
                  ? { scaleY: [1, 0.15, 1] }
                  : mood === "sleepy"
                  ? { scaleY: 0.2 }
                  : { scaleY: [1, 0.15, 1] }
              }
              transition={{ duration: mood === "gross" ? 0.22 : 2.6, repeat: Infinity, repeatDelay: mood === "gross" ? 0 : 2 }}
            />
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-current"
              animate={
                mood === "love"
                  ? { scale: [1, 1.4, 1] }
                  : mood === "angry"
                  ? { scaleY: 0.35, rotate: -25 }
                  : mood === "sleepy"
                  ? { scaleY: 0.2 }
                  : { scaleY: [1, 0.15, 1] }
              }
              transition={{ duration: mood === "love" ? 0.4 : 2.6, repeat: Infinity, repeatDelay: mood === "love" ? 0 : 2 }}
            />
          </span>

          <span
            className={`absolute bottom-2 rounded-full bg-current ${
              mood === "gross" || mood === "angry"
                ? "h-1 w-6 rotate-180"
                : mood === "chew"
                ? "h-2 w-3"
                : mood === "dance"
                ? "h-1.5 w-7"
                : "h-1 w-6"
            }`}
          />
        </span>

        <span className={`relative mx-auto mt-1 block h-8 w-11 rounded-xl border border-[#333] bg-[#101010] ${faceColor}`}>
          <span className="mx-auto mt-2 block h-3 w-5 rounded-full border border-current opacity-70" />
          <motion.span
            className="absolute left-1 top-2 h-1.5 w-1.5 rounded-full bg-current"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <motion.span
            className="absolute right-1 top-2 h-1.5 w-1.5 rounded-full bg-current"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </span>

        <motion.span
          className="absolute left-5 top-[74px] h-5 w-2 rounded-b bg-zinc-700"
          animate={patrol || mood === "dance" || mood === "spin" ? { rotate: [22, -22, 22] } : { rotate: 0 }}
          transition={{ duration: mood === "dance" || mood === "spin" ? 0.28 : 0.42, repeat: patrol || mood === "dance" || mood === "spin" ? Infinity : 0 }}
        />
        <motion.span
          className="absolute right-5 top-[74px] h-5 w-2 rounded-b bg-zinc-700"
          animate={patrol || mood === "dance" || mood === "spin" ? { rotate: [-22, 22, -22] } : { rotate: 0 }}
          transition={{ duration: mood === "dance" || mood === "spin" ? 0.28 : 0.42, repeat: patrol || mood === "dance" || mood === "spin" ? Infinity : 0 }}
        />
      </motion.button>

      <div className="absolute left-8 top-[118px] rounded-full border border-cyan/30 bg-black/80 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-cyan">
        score {score} | x{streak}
      </div>

      <AnimatePresence>
        {prop && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.8 }}
            className="absolute left-2 top-24"
          >
            {prop === "nut" && (
              <div className="relative h-8 w-12 border-b-4 border-x-2 border-zinc-600 bg-[#121212]">
                <span className="absolute left-3 top-1 h-3 w-3 rounded-full bg-amber-500" />
                <span className="absolute left-6 top-0 h-2.5 w-2.5 rounded-full bg-yellow-700" />
              </div>
            )}
            {prop === "juice" && (
              <div className="relative h-10 w-5 rounded-b border border-lime/70 bg-lime/25">
                <span className="absolute -top-2 left-1 h-2 w-3 border-t border-lime/70" />
              </div>
            )}
            {prop === "bottle" && (
              <div className="relative h-9 w-4 rotate-12 rounded-b border border-[#9B5CFF] bg-[#9B5CFF]/25">
                <span className="absolute -top-2 left-1 h-2 w-2 bg-[#9B5CFF]" />
              </div>
            )}
            {prop === "spark" && (
              <div className="font-mono text-lg text-pink drop-shadow-[0_0_10px_rgba(255,0,85,0.8)]">+</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={line}
          initial={{ opacity: 0, y: 8, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.92 }}
          className="absolute -right-3 top-0 max-w-[150px] border border-[#222] bg-black/90 px-2 py-1 font-mono text-[8px] uppercase leading-relaxed tracking-widest text-white shadow-[0_0_20px_rgba(0,240,255,0.12)] sm:max-w-[180px] sm:text-[9px]"
        >
          {line}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
